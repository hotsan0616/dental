package com.SEHS4701.group.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
public class PatientByIdResponse extends BaseResponse {
    private Patient patient;

    public PatientByIdResponse(Patient patient) {
        this.patient = patient;
    }

    public PatientByIdResponse(int code, Patient patient) {
        super(code);
        this.patient = patient;
    }

    public PatientByIdResponse(int code, String message, Patient patient) {
        super(code, message);
        this.patient = patient;
    }
    @Getter
    @Setter
    public static class Patient {
        private int id;
        private String firstName;
        private String lastName;
        private String emailAddress;
        private String gender;
        private LocalDateTime dob;
        private String phone;
        private String password;
        private LocalDateTime createdAt;
        private LocalDateTime lastLoginAt;

    }
}
