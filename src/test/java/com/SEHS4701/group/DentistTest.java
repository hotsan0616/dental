package com.SEHS4701.group;

import com.SEHS4701.group.dto.DentistByIdResponse;
import com.SEHS4701.group.service.DentistService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DentistTest {
    @Mock
    private DentistService dentistService;

    private DentistByIdResponse dentistByIdResponse;

    @BeforeEach
    void setUp() {
        DentistByIdResponse.Dentist dentist = new DentistByIdResponse.Dentist();
        dentist.setId(1);
        dentist.setFirstName("William");
        dentist.setLastName("Lam");
        dentist.setGender("M");
        dentist.setEmailAddress("william.lam@clinic.com");
        dentist.setImageUrl("https://poly-sehs4701-groupproject-s3.s3.ap-east-1.amazonaws.com/dentists/william.jpg");
        dentistByIdResponse = new DentistByIdResponse(dentist);
    }

    @Test
    void testGetDentistById() {
        // Arrange
        when(dentistService.getById(1)).thenReturn(dentistByIdResponse);

        // Act
        DentistByIdResponse result = dentistService.getById(1);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getDentist().getId());
        assertEquals("William", result.getDentist().getFirstName());
        assertEquals("Lam", result.getDentist().getLastName());
        assertEquals("M", result.getDentist().getGender());
        assertEquals("william.lam@clinic.com", result.getDentist().getEmailAddress());
        assertEquals("https://poly-sehs4701-groupproject-s3.s3.ap-east-1.amazonaws.com/dentists/william.jpg", result.getDentist().getImageUrl());
        verify(dentistService, times(1)).getById(1);
    }
}
