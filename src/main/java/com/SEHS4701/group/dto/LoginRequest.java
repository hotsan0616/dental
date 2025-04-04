package com.SEHS4701.group.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class LoginRequest {
    private String email;
    private String password;
}
