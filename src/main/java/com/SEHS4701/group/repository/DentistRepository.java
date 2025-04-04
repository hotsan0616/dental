package com.SEHS4701.group.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SEHS4701.group.model.Dentist;
import org.springframework.stereotype.Repository;

@Repository
public interface DentistRepository extends JpaRepository<Dentist, Integer> {
}