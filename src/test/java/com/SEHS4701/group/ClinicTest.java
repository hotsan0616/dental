package com.SEHS4701.group;

import com.SEHS4701.group.dto.ClinicByIdResponse;
import com.SEHS4701.group.service.ClinicService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClinicTest {
    @Mock
    private ClinicService ClinicService;

    private ClinicByIdResponse ClinicByIdResponse;

    @BeforeEach
    void setUp() {
        ClinicByIdResponse.Clinic Clinic = new ClinicByIdResponse.Clinic();
        Clinic.setId(1);
        Clinic.setName("Tuen Mun Clinic");
        Clinic.setDistrict("Tuen Mun");
        Clinic.setAddress("2/F, Yan Oi Polyclinic\r\n6 Tuen Lee Street, Tuen Mun");
        Clinic.setPhone("24523261");
        Clinic.setOpenHours("Mon-Fri 9:00-18:00");
        ClinicByIdResponse = new ClinicByIdResponse(Clinic);
    }

    @Test
    void testGetClinicById() {
        // Arrange
        when(ClinicService.getById(1)).thenReturn(ClinicByIdResponse);

        // Act
        ClinicByIdResponse result = ClinicService.getById(1);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getClinic().getId());
        assertEquals("Tuen Mun Clinic", result.getClinic().getName());
        assertEquals("Tuen Mun", result.getClinic().getDistrict());
        assertEquals("2/F, Yan Oi Polyclinic\r\n6 Tuen Lee Street, Tuen Mun", result.getClinic().getAddress());
        assertEquals("24523261", result.getClinic().getPhone());
        assertEquals("Mon-Fri 9:00-18:00", result.getClinic().getOpenHours());
        verify(ClinicService, times(1)).getById(1);
    }
}
