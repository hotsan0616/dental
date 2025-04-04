package com.SEHS4701.group.serviceImpl;

import com.SEHS4701.group.dto.ContactUsRequest;
import com.SEHS4701.group.model.ContactUs;
import com.SEHS4701.group.repository.ContactUsRepository;
import com.SEHS4701.group.service.ContactUsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactUsServiceImpl implements ContactUsService {

    @Autowired
    private ContactUsRepository contactUsRepository;

    @Override
    public ContactUs saveContactForm(ContactUsRequest request) {
        ContactUs contactUs = new ContactUs();
        contactUs.setFirstName(request.getFirstName());
        contactUs.setLastName(request.getLastName());
        contactUs.setPhone(request.getPhone());
        contactUs.setEmailAddress(request.getEmailAddress());
        contactUs.setTopic(request.getTopic());
        contactUs.setMessage(request.getMessage());
        
        return contactUsRepository.save(contactUs);
    }
}
