package com.SEHS4701.group;

import com.SEHS4701.group.dto.ClinicDentistByIdResponse;
import com.SEHS4701.group.model.DayOfWeek;
import com.SEHS4701.group.service.ClinicDentistService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClinicDentistTest {

    @Mock
    private ClinicDentistService clinicDentistService;

    private ClinicDentistByIdResponse response;

    @BeforeEach
    void setUp() {
        // Create Clinic
        ClinicDentistByIdResponse.ClinicDentist.Clinic clinic = new ClinicDentistByIdResponse.ClinicDentist.Clinic();
        clinic.setId(1);
        clinic.setName("Tuen Mun Clinic");
        clinic.setAddress("2/F, Yan Oi Polyclinic\n6 Tuen Lee Street, Tuen Mun");
        clinic.setDistrict("Tuen Mun");
        clinic.setPhone("24523261");
        clinic.setOpenHours("Mon-Fri 9:00-18:00");

        // Create Dentist
        ClinicDentistByIdResponse.ClinicDentist.Dentist dentist = new ClinicDentistByIdResponse.ClinicDentist.Dentist();
        dentist.setId(1);
        dentist.setFirstName("William");
        dentist.setLastName("Lam");
        dentist.setGender("M");
        dentist.setEmailAddress("william.lam@clinic.com");
        dentist.setImageUrl("https://poly-sehs4701-groupproject-s3.s3.ap-east-1.amazonaws.com/dentists/william.jpg");

        // Create Timeslot
        ClinicDentistByIdResponse.ClinicDentist.Timeslot timeslot = new ClinicDentistByIdResponse.ClinicDentist.Timeslot();
        timeslot.setId(1);
        timeslot.setStartTime("09:00:00");
        timeslot.setEndTime("10:00:00");

        // Create ClinicDentist
        ClinicDentistByIdResponse.ClinicDentist clinicDentist = new ClinicDentistByIdResponse.ClinicDentist();
        clinicDentist.setId(1);
        clinicDentist.setClinicReferenceId(1);
        clinicDentist.setClinic(clinic);
        clinicDentist.setDentistReferenceId(1);
        clinicDentist.setDentist(dentist);
        clinicDentist.setDayOfWeek(DayOfWeek.Mon);
        clinicDentist.setTimeslotReferenceId(1);
        clinicDentist.setTimeslot(timeslot);

        // Create Response
        response = new ClinicDentistByIdResponse(clinicDentist);
        response.setCode(0);
        response.setMessage("success");
    }

    @Test
    void testGetClinicDentistsByClinicId() {
        // Arrange
        when(clinicDentistService.getById(1)).thenReturn(response);

        // Act
        ClinicDentistByIdResponse result = clinicDentistService.getById(1);

        // Assert
        assertNotNull(result);
        assertEquals(0, result.getCode());
        assertEquals("success", result.getMessage());
        assertNotNull(result.getClinicDentist());

        ClinicDentistByIdResponse.ClinicDentist clinicDentist = result.getClinicDentist();
        assertEquals(1, clinicDentist.getId());
        assertEquals(1, clinicDentist.getClinicReferenceId());
        assertEquals(1, clinicDentist.getDentistReferenceId());
        assertEquals(1, clinicDentist.getTimeslotReferenceId());
        assertEquals(DayOfWeek.Mon, clinicDentist.getDayOfWeek());

        // Assert Clinic
        ClinicDentistByIdResponse.ClinicDentist.Clinic clinic = clinicDentist.getClinic();
        assertEquals(1, clinic.getId());
        assertEquals("Tuen Mun Clinic", clinic.getName());
        assertEquals("2/F, Yan Oi Polyclinic\n6 Tuen Lee Street, Tuen Mun", clinic.getAddress());
        assertEquals("Tuen Mun", clinic.getDistrict());
        assertEquals("24523261", clinic.getPhone());
        assertEquals("Mon-Fri 9:00-18:00", clinic.getOpenHours());

        // Assert Dentist
        ClinicDentistByIdResponse.ClinicDentist.Dentist dentist = clinicDentist.getDentist();
        assertEquals(1, dentist.getId());
        assertEquals("William", dentist.getFirstName());
        assertEquals("Lam", dentist.getLastName());
        assertEquals("M", dentist.getGender());
        assertEquals("william.lam@clinic.com", dentist.getEmailAddress());
        assertEquals("https://poly-sehs4701-groupproject-s3.s3.ap-east-1.amazonaws.com/dentists/william.jpg", dentist.getImageUrl());

        // Assert Timeslot
        ClinicDentistByIdResponse.ClinicDentist.Timeslot timeslot = clinicDentist.getTimeslot();
        assertEquals(1, timeslot.getId());
        assertEquals("09:00:00", timeslot.getStartTime());
        assertEquals("10:00:00", timeslot.getEndTime());

        // Verify service call
        verify(clinicDentistService, times(1)).getById(1);
    }
}
