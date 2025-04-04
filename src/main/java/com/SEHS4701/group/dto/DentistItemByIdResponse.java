package com.SEHS4701.group.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class DentistItemByIdResponse extends BaseResponse {
    private DentistItem dentistItem;

    public DentistItemByIdResponse(DentistItem dentistItem) {
        this.dentistItem = dentistItem;
    }

    @Getter
    @Setter
    public static class DentistItem {
        private int id;
        private String name;
    }
}
