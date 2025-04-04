package com.SEHS4701.group.controller;

import com.SEHS4701.group.dto.BaseResponse;
import com.SEHS4701.group.service.DentistItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/dentistItem")
public class DentistItemController {
	private final DentistItemService dentistItemService;

    public DentistItemController(DentistItemService dentistItemService) {
        this.dentistItemService = dentistItemService;
    }


    @GetMapping("/list")
	public ResponseEntity<?> getList(){
		try {
            return new ResponseEntity<>(dentistItemService.getList(), HttpStatus.OK);
		}
		catch (RuntimeException e){
			return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PathVariable Integer id) {
		try {
			return new ResponseEntity<>(dentistItemService.getById(id), HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/dentist/{dentistId}")
	public ResponseEntity<?> getByDentistId(@PathVariable Integer dentistId) {
		try {
			return new ResponseEntity<>(dentistItemService.getByDentistId(dentistId), HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}




}