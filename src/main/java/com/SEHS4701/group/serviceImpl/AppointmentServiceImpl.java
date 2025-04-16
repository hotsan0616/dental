package com.SEHS4701.group.serviceImpl;

import com.SEHS4701.group.dto.AppointmentByPatientIdResponse;
import com.SEHS4701.group.dto.AppointmentCreateRequest;
import com.SEHS4701.group.dto.AppointmentCreateResponse;
import com.SEHS4701.group.dto.AppointmentListResponse;
import com.SEHS4701.group.model.Appointment;
import com.SEHS4701.group.model.AppointmentItem;
import com.SEHS4701.group.model.ClinicDentist;
import com.SEHS4701.group.model.Patient;
import com.SEHS4701.group.repository.AppointmentRepository;
import com.SEHS4701.group.repository.ClinicDentistRepository;
import com.SEHS4701.group.repository.PatientRepository;
import com.SEHS4701.group.service.AppointmentService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final ModelMapper modelMapper;
    private final JavaMailSender mailSender;
    private final PatientRepository patientRepository;
    private final ClinicDentistRepository clinicDentistRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository, ModelMapper modelMapper, JavaMailSender mailSender, PatientRepository patientRepository, ClinicDentistRepository clinicDentistRepository) {
        this.appointmentRepository = appointmentRepository;
        this.modelMapper = modelMapper;
        this.mailSender = mailSender;
        this.patientRepository = patientRepository;
        this.clinicDentistRepository = clinicDentistRepository;
    }


    @Override
    @Transactional
    public AppointmentCreateResponse createAppointment(AppointmentCreateRequest appointmentCreateRequest) throws Exception {
        Patient patient = patientRepository.findById(appointmentCreateRequest.getPatientId())
                .orElseThrow(() -> new Exception("Patient not found with ID: " + appointmentCreateRequest.getPatientId()));
        ClinicDentist clinicDentist = clinicDentistRepository.findById(appointmentCreateRequest.getClinicDentistId())
                .orElseThrow(() -> new Exception("ClinicDentist not found with ID: " + appointmentCreateRequest.getClinicDentistId()));

        // Step 2: Create a new Appointment entity manually instead of relying solely on ModelMapper
        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setClinicDentist(clinicDentist);
        appointment.setAppointmentDate(appointmentCreateRequest.getAppointmentDate());
        appointment.setTotalAmount(String.valueOf(appointmentCreateRequest.getTotalAmount())); // Convert Integer to String
        appointment.setStatus(appointmentCreateRequest.getStatus());
        appointment.setCreatedAt(LocalDateTime.now());

//        Appointment appointment = modelMapper.map(appointmentCreateRequest, Appointment.class);
//        System.out.println(appointment.getId());
        if (appointmentCreateRequest.getAppointmentItems() != null) {
            List<AppointmentItem> items = appointmentCreateRequest.getAppointmentItems().stream()
                    .map(itemDto -> {
                        AppointmentItem item = new AppointmentItem();
                        item.setStartTime(itemDto.getStartTime());
                        item.setEndTime(itemDto.getEndTime());
                        item.setAppointment(appointment); // Set the bidirectional relationship
                        return item;
                    }).collect(Collectors.toList());
            appointment.setAppointmentItems(items);
        }

        // Check if within 3 months
        LocalDateTime maxDate = LocalDateTime.now().plusMonths(3);
        if (appointment.getAppointmentDate().isAfter(maxDate)) {
            throw new Exception("Booking must be within the next 3 months!");
        }

        // Check availability
//        List<Appointment> existing = appointmentRepository.findByDentistIdAndDateAndTime(
//                appointment.getClinicDentist().getDentist().getId(), appointment.getDate(), appointment.getTime());
//        if (!existing.isEmpty()) {
//            return "Slot already booked!";
//        }

        // Save appointment
        AppointmentCreateResponse appointmentCreateResponse = new AppointmentCreateResponse();
        appointmentCreateResponse.setId(appointmentRepository.save(appointment).getId());

        // Send email
        sendConfirmationEmail(appointment);

        return appointmentCreateResponse;
    }

    @Override
    public AppointmentByPatientIdResponse getAppointmentsByPatient(Integer patientId) {
        List<Appointment> appointments = appointmentRepository.findByPatientId(patientId);
        if (appointments.isEmpty()) {
            throw new RuntimeException("Appointment not found");
        }
        return new AppointmentByPatientIdResponse(appointments.stream()
                .map(appointment -> {
                    AppointmentByPatientIdResponse.Appointment dto = modelMapper.map(appointment, AppointmentByPatientIdResponse.Appointment.class);
                    dto.setPatientId(appointment.getPatient().getId());
                    dto.setClinicDentistId(appointment.getClinicDentist().getId());
                    return dto;
                }
        ).collect(Collectors.toList()));
    }

    @Override
    public Appointment getAppointment(Integer id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        if (appointment.isEmpty()) {
            throw new RuntimeException("Appointment not found");
        }
        return appointment.get();
    }

    @Override
    public AppointmentListResponse getAll() {
        List<Appointment> appointments = appointmentRepository.findAll();
        if (appointments.isEmpty()) {
            throw new RuntimeException("Appointment not found");
        }
        return new AppointmentListResponse(appointments.stream().map(
                appointment -> modelMapper.map(appointment, AppointmentListResponse.Appointment.class)
        ).collect(Collectors.toList()));
    }

    private void sendConfirmationEmail(Appointment appointment) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(appointment.getPatient().getEmailAddress());
        message.setSubject("Appointment Confirmation");
        message.setText("Dear " + appointment.getPatient().getFirstName()+ " " + appointment.getPatient().getLastName() + ",\n\n" +
                "Your appointment with " + appointment.getClinicDentist().getDentist().getFirstName() + " " + appointment.getClinicDentist().getDentist().getLastName() +
                " at " + appointment.getClinicDentist().getClinic().getName() +
                " on " + appointment.getAppointmentDate() +
                " is confirmed.\n\nBest regards,\nHKDC Team");
        mailSender.send(message);
    }

//    @Override
//	public List<Appointment> getPatientAppointments(int patientId) {
//        return appointmentRepository.findByPatientId(patientId);
//    }
}