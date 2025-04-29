package com.SEHS4701.group;

import com.SEHS4701.group.dto.DentistItemByIdResponse;
import com.SEHS4701.group.service.DentistItemService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DentistItemTest {

    @Mock
    private DentistItemService dentistItemService;

    private DentistItemByIdResponse response;

    @BeforeEach
    void setUp() {
        // Create Dentist
        DentistItemByIdResponse.DentistItem.Dentist dentist = new DentistItemByIdResponse.DentistItem.Dentist();
        dentist.setId(1);
        dentist.setFirstName("William");
        dentist.setLastName("Lam");
        dentist.setGender("M");
        dentist.setEmailAddress("william.lam@clinic.com");

        // Create Item
        DentistItemByIdResponse.DentistItem.Item item = new DentistItemByIdResponse.DentistItem.Item();
        item.setId(1);
        item.setName("Teeth Cleaning");

        // Create DentistItem
        DentistItemByIdResponse.DentistItem dentistItem = new DentistItemByIdResponse.DentistItem();
        dentistItem.setId(1);
        dentistItem.setDentistReferenceId(1);
        dentistItem.setDentist(dentist);
        dentistItem.setItemReferenceId(1);
        dentistItem.setItem(item);
        dentistItem.setFee(200.0f);

        // Create Response
        response = new DentistItemByIdResponse(dentistItem);
        response.setCode(0);
        response.setMessage("success");
    }

    @Test
    void testGetDentistItemById() {
        // Arrange
        when(dentistItemService.getById(1)).thenReturn(response);

        // Act
        DentistItemByIdResponse result = dentistItemService.getById(1);

        // Assert
        assertNotNull(result);
        assertEquals(0, result.getCode());
        assertEquals("success", result.getMessage());
        assertNotNull(result.getDentistItem());

        DentistItemByIdResponse.DentistItem dentistItem = result.getDentistItem();
        assertEquals(1, dentistItem.getId());
        assertEquals(1, dentistItem.getDentistReferenceId());
        assertEquals(1, dentistItem.getItemReferenceId());
        assertEquals(200.0f, dentistItem.getFee(), 0.01);

        // Assert Dentist
        DentistItemByIdResponse.DentistItem.Dentist dentist = dentistItem.getDentist();
        assertEquals(1, dentist.getId());
        assertEquals("William", dentist.getFirstName());
        assertEquals("Lam", dentist.getLastName());
        assertEquals("M", dentist.getGender());
        assertEquals("william.lam@clinic.com", dentist.getEmailAddress());

        // Assert Item
        DentistItemByIdResponse.DentistItem.Item item = dentistItem.getItem();
        assertEquals(1, item.getId());
        assertEquals("Teeth Cleaning", item.getName());

        // Verify service call
        verify(dentistItemService, times(1)).getById(1);
    }
}