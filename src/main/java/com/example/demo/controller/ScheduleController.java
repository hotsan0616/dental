package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.example.demo.repository.PatientRepository;

@Controller
public class ScheduleController {
	@Autowired
	private PatientRepository patientRepository;

}