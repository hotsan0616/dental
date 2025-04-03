package com.SEHS4701.group.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class DentistListResponse extends BaseResponse {
    private List<Dentist> dentistList;

    public DentistListResponse(List<Dentist> dentistList) {
        this.dentistList = dentistList;
    }

    @Getter
    @Setter
    public static class Dentist{
        private int id;
        private String firstName;
        private String lastName;
        private String gender;
        private String emailAddress;
        private String imageUrl;
    }   
}
