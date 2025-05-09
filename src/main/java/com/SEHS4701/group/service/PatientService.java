package com.SEHS4701.group.service;

import com.SEHS4701.group.dto.EditRequest;
import com.SEHS4701.group.dto.LoginResponse;
import com.SEHS4701.group.dto.PatientByIdResponse;
import com.SEHS4701.group.dto.RegisterRequest;

public interface PatientService{

	int registerPatient(RegisterRequest registerRequest);

	LoginResponse login(String email, String password);

	PatientByIdResponse getById(Integer id);

	void edit(EditRequest editRequest);

	void sendPasswordResetEmail(String email);
	
    void resetPassword(String email, String code, String newPassword);
}