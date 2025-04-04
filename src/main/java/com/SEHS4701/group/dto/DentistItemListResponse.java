package com.SEHS4701.group.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class DentistItemListResponse extends BaseResponse {
    private List<DentistItem> dentistItemList;

    public DentistItemListResponse(List<DentistItem> dentistItemList) {
        this.dentistItemList = dentistItemList;
    }

    @Getter
    @Setter
    public static class DentistItem {
        private int id;
        private String name;
    }
}
