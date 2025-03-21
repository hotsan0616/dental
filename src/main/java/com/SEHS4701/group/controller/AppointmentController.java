package com.SEHS4701.group.controller;

import com.SEHS4701.group.dto.AppointmentCreateRequest;
import com.SEHS4701.group.dto.BaseResponse;
import com.SEHS4701.group.service.AppointmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/appointment")
public class AppointmentController {
	private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }


    @PostMapping("/create")
	public ResponseEntity<?> createAppointment(@RequestBody AppointmentCreateRequest appointmentCreateRequest) {
		try {
			appointmentService.createAppointment(appointmentCreateRequest);
			return new ResponseEntity<>(new BaseResponse(), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/patient/{patientId}")
	public ResponseEntity<?> getPatientAppointments(@PathVariable("patientId") Integer patientId) {
		try {
		return new ResponseEntity<>(appointmentService.getAppointmentsByPatient(patientId), HttpStatus.OK);
		}catch(RuntimeException e) {
			return new ResponseEntity<>(new BaseResponse(HttpStatus.NOT_FOUND.value(), e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/list")
	public ResponseEntity<?> getPatientAppointments() {
		try {
			return new ResponseEntity<>(appointmentService.getAll(), HttpStatus.OK);
		}catch(RuntimeException e) {
			return new ResponseEntity<>(new BaseResponse(HttpStatus.NOT_FOUND.value(), e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}


}