package com.SEHS4701.group.repository;

import com.SEHS4701.group.model.ContactUs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactUsRepository extends JpaRepository<ContactUs, Long> {
}