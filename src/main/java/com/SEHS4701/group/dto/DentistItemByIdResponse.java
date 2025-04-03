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
        }

        @Getter
        @Setter
        public static class Item {
            private Integer id;
            private String name;
        }
    }
}
