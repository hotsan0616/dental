package com.example.demo.dto;

import com.example.demo.model.Clinic;
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
}
