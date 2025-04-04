package com.SEHS4701.group.controller;

import com.SEHS4701.group.dto.BaseResponse;
import com.SEHS4701.group.dto.LoginRequest;
import com.SEHS4701.group.dto.RegisterRequest;
import com.SEHS4701.group.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/patient")
public class PatientController {
    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        try {
            return new ResponseEntity<>(patientService.getById(id), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            patientService.registerPatient(registerRequest);
            return new ResponseEntity<>(new BaseResponse(), HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            return new ResponseEntity<>(patientService.login(loginRequest.getEmail(), loginRequest.getPassword()), HttpStatus.OK);
        }catch (RuntimeException e) {
            return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

}