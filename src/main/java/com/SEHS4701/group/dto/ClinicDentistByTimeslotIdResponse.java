package com.SEHS4701.group.dto;

import com.SEHS4701.group.model.DayOfWeek;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class ClinicDentistByTimeslotIdResponse extends BaseResponse {
    private List<ClinicDentist> clinicDentistList;

    public ClinicDentistByTimeslotIdResponse(List<ClinicDentist> CLinicDentistList) {
        this.clinicDentistList = CLinicDentistList;
    }

    @Getter
    @Setter
    public static class ClinicDentist{
        private Integer id;
        private Integer clinicReferenceId;
        private Clinic clinic;
        private Integer dentistReferenceId;
        private Dentist dentist;
        private DayOfWeek dayOfWeek;
        private Integer timeslotReferenceId;
        private Timeslot timeslot;

        @Getter
        @Setter
        public static class Clinic {
            private Integer id;
            private String name;
            private String address;
            private String district;
            private String phone;
            private String openHours;
        }

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
        public static class Timeslot {
            private Integer id;
            private String startTime;
            private String endTime;
        }
    }
}
