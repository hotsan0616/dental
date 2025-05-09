package com.SEHS4701.group.controller;

import com.SEHS4701.group.dto.AppointmentCreateRequest;
import com.SEHS4701.group.dto.AppointmentCancelRequest;
import com.SEHS4701.group.dto.AppointmentCreateResponse;
import com.SEHS4701.group.dto.BaseResponse;
import com.SEHS4701.group.dto.BookedClinicDentistIdsResponse;
import com.SEHS4701.group.service.AppointmentService;
import jakarta.validation.Valid;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/appointment")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAppointment(@Valid @RequestBody AppointmentCreateRequest appointmentCreateRequest) {
        try {
            int lastInsertId = appointmentService.createAppointment(appointmentCreateRequest);
            return new ResponseEntity<>(new AppointmentCreateResponse(lastInsertId), HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<?> getPatientAppointments(@PathVariable("patientId") Integer patientId) {
        try {
            return new ResponseEntity<>(appointmentService.getAppointmentsByPatient(patientId), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new BaseResponse(HttpStatus.NOT_FOUND.value(), e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> getPatientAppointments() {
        try {
            return new ResponseEntity<>(appointmentService.getAll(), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new BaseResponse(HttpStatus.NOT_FOUND.value(), e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id){
        try {
            return new ResponseEntity<>(appointmentService.getById(id), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new BaseResponse(HttpStatus.NOT_FOUND.value(), e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/clinicId/{clinicId}/dentistId/{dentistId}/appointmentDate/{appointmentDate}")
    public ResponseEntity<?> getBookedClinicDentistIds(
            @PathVariable Integer clinicId,
            @PathVariable Integer dentistId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate appointmentDate) {
        try {
            BookedClinicDentistIdsResponse response = appointmentService.getBookedClinicDentistIds(clinicId, dentistId, appointmentDate);
            return new ResponseEntity<>(response, response.getCode() == 0 ? HttpStatus.OK : HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/cancel")
    public ResponseEntity<?> cancelAppointment(@Valid @RequestBody AppointmentCancelRequest cancelRequest) {
        try {
            appointmentService.cancelAppointment(cancelRequest.getAppointmentId());
            return new ResponseEntity<>(new BaseResponse(HttpStatus.OK.value(), "Appointment cancelled successfully"), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}