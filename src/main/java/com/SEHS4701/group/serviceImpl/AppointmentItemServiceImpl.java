package com.SEHS4701.group.serviceImpl;

import com.SEHS4701.group.model.AppointmentItem;
import com.SEHS4701.group.repository.AppointmentItemRepository;
import com.SEHS4701.group.service.AppointmentItemService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentItemServiceImpl implements AppointmentItemService {
    private final AppointmentItemRepository appointmentItemRepository;
    private final ModelMapper modelMapper;

    public AppointmentItemServiceImpl(AppointmentItemRepository appointmentItemRepository, ModelMapper modelMapper) {
        this.appointmentItemRepository = appointmentItemRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public void create(AppointmentItem appointmentItem) {
        appointmentItemRepository.save(appointmentItem);
    }

//    @Override
//    public AppointmentItemByPatientIdResponse getByPatientId(Integer PatientId) {
//        List<AppointmentItem> appointmentItemList = appointmentItemRepository.findByPatientId(PatientId);
//        if(appointmentItemList.isEmpty()){
//            throw new RuntimeException("Appointment Item not found");
//        }
//        return new AppointmentItemByPatientIdResponse(appointmentItemList.stream()
//                .map(appointmentItem -> modelMapper
//                        .map(appointmentItem, AppointmentItemByPatientIdResponse.AppointmentItem.class))
//                .collect(Collectors.toList()));
//    }


    @Override
    public List<AppointmentItem> getByDentistItem(Integer dentalId) {
        List<AppointmentItem> appointmentItem = appointmentItemRepository.findByDentistItemId(dentalId);
        if(appointmentItem.isEmpty()){
            throw new RuntimeException("Appointment Item not found");
        }
        return appointmentItem;
    }


//    @Override
//	public String bookAppointment(Appointment appointment) {
//        // Check if within 3 months
//        LocalDate maxDate = LocalDate.now().plusMonths(3);
//        if (appointment.getDate().isAfter(maxDate)) {
//            return "Booking must be within the next 3 months!";
//        }
//
//        // Check availability
//        List<Appointment> existing = appointmentRepository.findByDentistIdAndDateAndTime(
//                appointment.getDentist().getId(), appointment.getDate(), appointment.getTime());
//        if (!existing.isEmpty()) {
//            return "Slot already booked!";
//        }
//
//        // Save appointment
//        appointmentRepository.save(appointment);
//
//        // Send email
//        //sendConfirmationEmail(appointment);
//        return null; // Success
//    }

//    private void sendConfirmationEmail(Appointment appointment) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(appointment.getPatient().getEmail());
//        message.setSubject("Appointment Confirmation");
//        message.setText("Dear " + appointment.getPatient().getName() + ",\n\n" +
//                "Your appointment with " + appointment.getDentist().getName() +
//                " at " + appointment.getClinics().getName() +
//                " on " + appointment.getDate() + " at " + appointment.getTime() +
//                " is confirmed.\n\nBest regards,\nHKDC Team");
//        mailSender.send(message);
//    }

//    @Override
//	public List<Appointment> getPatientAppointments(int patientId) {
//        return appointmentRepository.findByPatientId(patientId);
//    }
}