package com.SEHS4701.group.service;

import com.SEHS4701.group.dto.ContactUsRequest;
import com.SEHS4701.group.model.ContactUs;

public interface ContactUsService {
    ContactUs saveContactForm(ContactUsRequest request);
} 