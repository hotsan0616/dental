package com.SEHS4701.group.controller;

import com.SEHS4701.group.dto.BaseResponse;
import com.SEHS4701.group.service.ClinicDentistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/clinicDentist")
public class ClinicDentistController {
	private final ClinicDentistService clinicDentistService;

    public ClinicDentistController(ClinicDentistService clinicDentistService) {
        this.clinicDentistService = clinicDentistService;
    }


    @GetMapping("/list")
	public ResponseEntity<?> getList(){
		try {
            return new ResponseEntity<>(clinicDentistService.getList(), HttpStatus.OK);
		}
		catch (RuntimeException e){
			return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PathVariable Integer id) {
		try {
			return new ResponseEntity<>(clinicDentistService.getById(id), HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/dentist/{dentistId}")
	public ResponseEntity<?> getByDentistId(@PathVariable Integer dentistId) {
		try {
			return new ResponseEntity<>(clinicDentistService.getByDentistId(dentistId), HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{clinicId}")
	public ResponseEntity<?> getByClinicId(@PathVariable Integer clinicId) {
		try {
			return new ResponseEntity<>(clinicDentistService.getByClinicId(clinicId), HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{timeslotId}")
	public ResponseEntity<?> getByTimeslotId(@PathVariable Integer timeslotId) {
		try {
			return new ResponseEntity<>(clinicDentistService.getByTimeslotId(timeslotId), HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}


}