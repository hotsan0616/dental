package com.SEHS4701.group.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ClinicByIdResponse extends BaseResponse {
    private Clinic clinic;

    public ClinicByIdResponse(Clinic clinic) {
        this.clinic = clinic;
    }

    public ClinicByIdResponse(int code, Clinic clinic) {
        super(code);
        this.clinic = clinic;
    }

    public ClinicByIdResponse(int code, String message, Clinic clinic) {
        super(code, message);
        this.clinic = clinic;
    }
    @Getter
    @Setter
    public static class Clinic{
            private int id;
            private String name;
            private String address;
            private String district;
            private String phone;
            private String openHours;
    }
}
