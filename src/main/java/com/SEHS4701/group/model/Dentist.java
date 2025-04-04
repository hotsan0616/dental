package com.SEHS4701.group.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "dentists")
@Getter
@Setter
public class Dentist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String firstName;
    private String lastName;
    private String gender;
    private String phone;
    private String emailAddress;

    @OneToMany(mappedBy = "dentist")
    private List<ClinicDentist> clinicDentist;
    @OneToMany(mappedBy = "dentist")
    private List<DentistItem> dentistItems;

}