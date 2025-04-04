package com.SEHS4701.group.controller;

import com.SEHS4701.group.dto.BaseResponse;
import com.SEHS4701.group.service.DentistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/dentist")
public class DentistController {
	private final DentistService dentistService;

    public DentistController(DentistService dentistService) {
        this.dentistService = dentistService;
    }


    @GetMapping("/list")
	public ResponseEntity<?> getList(){
		try {
			return new ResponseEntity<>(dentistService.getList(), HttpStatus.OK);
		}
		catch (RuntimeException e){
			return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

//	@GetMapping("/{id}")
//	public ResponseEntity<?> getById(@PathVariable Integer id) {
//		try {
//			Dentist dentist = dentistService.getById(id);
//			return new ResponseEntity<>(new DentistByIdResponse(dentist), HttpStatus.OK);
//		} catch (RuntimeException e) {
//			return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
//		}
//	}


}