package com.SEHS4701.group.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class DentistItemByItemIdResponse extends BaseResponse {
    private List<DentistItem> dentistItemList;

    public DentistItemByItemIdResponse(List<DentistItem> dentistItemList) {
        this.dentistItemList = dentistItemList;
    }

    @Getter
    @Setter
    public static class DentistItem {
        private int id;
        private Integer dentistReferenceId;
        private Dentist dentist;
        private Integer itemReferenceId;
        private Item item;
        private Float fee;

        @Getter
        @Setter
        public static class Dentist {
            private Integer id;
            private String firstName;
            private String lastName;
            private String gender;
            private String emailAddress;
            private String imageUrl;
        }

        @Getter
        @Setter
        public static class Item {
            private Integer id;
            private String name;
        }
    }
}
