package com.SEHS4701.group.controller;

import com.SEHS4701.group.dto.ContactUsRequest;
import com.SEHS4701.group.dto.BaseResponse;
import com.SEHS4701.group.model.ContactUs;
import com.SEHS4701.group.service.ContactUsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contact_us")
public class ContactUsController {

    @Autowired
    private ContactUsService contactUsService;

    @PostMapping
    public ResponseEntity<BaseResponse> submitContactForm(@Valid @RequestBody ContactUsRequest request) {
        try {
            ContactUs contactUs = contactUsService.saveContactForm(request);
            return new ResponseEntity<>(
                new BaseResponse(HttpStatus.CREATED.value(), "Contact form submitted successfully"), 
                HttpStatus.CREATED
            );
        } catch (RuntimeException e) {
            return new ResponseEntity<>(
                new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), 
                HttpStatus.BAD_REQUEST
            );
        }
    }
} 