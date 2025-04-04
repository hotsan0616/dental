package com.SEHS4701.group.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
public class LoginResponse extends BaseResponse {
    private Patient patient;

    public LoginResponse(Patient patient) {
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
        private LocalDateTime createdAt;
        private LocalDateTime lastLoginAt;

    }
}
