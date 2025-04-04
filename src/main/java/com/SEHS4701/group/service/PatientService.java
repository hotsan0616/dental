package com.SEHS4701.group.service;

import com.SEHS4701.group.dto.LoginResponse;
import com.SEHS4701.group.dto.PatientByIdResponse;
import com.SEHS4701.group.dto.RegisterRequest;

public interface PatientService {

	void registerPatient(RegisterRequest registerRequest);

	LoginResponse login(String email, String password);

	PatientByIdResponse getById(Integer id);
}