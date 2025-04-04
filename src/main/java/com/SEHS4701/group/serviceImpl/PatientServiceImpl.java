package com.SEHS4701.group.serviceImpl;

import com.SEHS4701.group.dto.LoginResponse;
import com.SEHS4701.group.dto.PatientByIdResponse;
import com.SEHS4701.group.dto.RegisterRequest;
import com.SEHS4701.group.model.Patient;
import com.SEHS4701.group.repository.PatientRepository;
import com.SEHS4701.group.service.PatientService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    private final ModelMapper modelMapper;

    public PatientServiceImpl(PatientRepository patientRepository, ModelMapper modelMapper) {
        this.patientRepository = patientRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void registerPatient(RegisterRequest registerRequest) {
        Patient patient = modelMapper.map(registerRequest, Patient.class);
        patient.setCreatedAt(LocalDateTime.now());
        patient.setLastLoginAt(LocalDateTime.now());
        Optional<Patient> registeredPatient = patientRepository.findByEmailAddress(patient.getEmailAddress());
        if (registeredPatient.isPresent() && registeredPatient.get().getEmailAddress().equals(registerRequest.getEmailAddress())) {
            throw new RuntimeException("Email already registered!");
        }
        patientRepository.save(patient);
    }

    @Override
    public LoginResponse login(String email, String password) {
        Optional<Patient> loginPatient = patientRepository.findByEmailAddress(email);
        if (loginPatient.isEmpty()
                || !loginPatient.get().getPassword().equals(password)
        ) {
            throw new RuntimeException("Invalid credentials!");
        }
        return new LoginResponse(modelMapper.map(loginPatient.get(), LoginResponse.Patient.class));
    }

    @Override
    public PatientByIdResponse getById(Integer id) {
            Patient patient = patientRepository.findById(id).orElseThrow(() -> new RuntimeException("Patient not found!"));
        return new PatientByIdResponse(modelMapper.map(patient, PatientByIdResponse.Patient.class));
    }
}