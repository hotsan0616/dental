package com.SEHS4701.group.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class DentistItemByDentistIdResponse extends BaseResponse {
    private List<DentistItem> dentistItem;

    public DentistItemByDentistIdResponse(List<DentistItem> dentistItem) {
        this.dentistItem = dentistItem;
    }

    @Getter
    @Setter
    public static class DentistItem {
        private int id;
        private String name;
    }
}
