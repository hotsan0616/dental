package com.SEHS4701.group.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ContactUsRequest {
    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{8}$", message = "Phone number must be 8 digits")
    private String phone;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String emailAddress;

    @NotBlank(message = "Topic is required")
    private String topic;

    @NotBlank(message = "Message is required")
    private String message;
} 