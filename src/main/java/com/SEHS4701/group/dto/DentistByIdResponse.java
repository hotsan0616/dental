package com.SEHS4701.group.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class DentistByIdResponse extends BaseResponse {
    private Dentist dentist;

    public DentistByIdResponse(Dentist dentist) {
        this.dentist = dentist;
    }

    public DentistByIdResponse(int code, Dentist dentist) {
        super(code);
        this.dentist = dentist;
    }

    public DentistByIdResponse(int code, String message, Dentist dentist) {
        super(code, message);
        this.dentist = dentist;
    }
    @Getter
    @Setter
    public static class Dentist{
        private Integer id;
        private String firstName;
        private String lastName;
        private String gender;
        private String emailAddress;
        private String imageUrl;
    }
}
