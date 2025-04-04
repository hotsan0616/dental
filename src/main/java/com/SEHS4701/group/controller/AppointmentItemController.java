package com.SEHS4701.group.controller;

import com.SEHS4701.group.service.AppointmentItemService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/appointmentItem")
public class AppointmentItemController {

	private final AppointmentItemService appointmentItemService;
	private final ModelMapper modelMapper;

    public AppointmentItemController(AppointmentItemService appointmentItemService, ModelMapper modelMapper) {
        this.appointmentItemService = appointmentItemService;
        this.modelMapper = modelMapper;
    }


//	@PostMapping("/create")
//	public ResponseEntity<?> createAppointmentItem(@RequestBody AppointmentItemCreateRequest appointmentItemCreateRequest) {
//		try {
//			appointmentItemService.save(appointment);
//			return new ResponseEntity<>(new BaseResponse(), HttpStatus.OK);
//		}catch(Exception e) {
//			return new ResponseEntity<>(new BaseResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()), HttpStatus.BAD_REQUEST);
//		}
//	}

//	@GetMapping("/appointment/{appointmentItemId}")
//	public ResponseEntity<?> getPatientAppointments(@PathVariable("appointmentItemId") Integer appointmentItemId) {
//		try {
//		return new ResponseEntity<>(appointmentItemService.getByPatientId(appointmentItemId), HttpStatus.OK);
//		}catch(RuntimeException e) {
//			return new ResponseEntity<>(new BaseResponse(HttpStatus.NOT_FOUND.value(), e.getMessage()), HttpStatus.NOT_FOUND);
//		}
//	}

//	@GetMapping("/list")
//	public ResponseEntity<?> getPatientAppointments() {
//		try {
//			List<Appointment> appointments = appointmentRepository.findAll();
//			return new ResponseEntity<>(new AppointmentListResponse(appointments), HttpStatus.OK);
//		}catch(RuntimeException e) {
//			return new ResponseEntity<>(new BaseResponse(HttpStatus.NOT_FOUND.value(), e.getMessage()), HttpStatus.NOT_FOUND);
//		}
//	}


}