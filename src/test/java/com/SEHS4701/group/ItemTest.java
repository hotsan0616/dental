package com.SEHS4701.group;

import com.SEHS4701.group.dto.ItemListResponse;
import com.SEHS4701.group.service.ItemService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ItemTest {

    @Mock
    private ItemService itemService;

    private ItemListResponse response;

    @BeforeEach
    void setUp() {
        // Create Items
        ItemListResponse.Item item1 = new ItemListResponse.Item();
        item1.setId(1);
        item1.setName("Teeth Cleaning");
        item1.setImage_url("https://poly-sehs4701-groupproject-s3.s3.ap-east-1.amazonaws.com/teeth_cleaning.jpg");

        ItemListResponse.Item item2 = new ItemListResponse.Item();
        item2.setId(2);
        item2.setName("Tooth Filling");
        item2.setImage_url("https://poly-sehs4701-groupproject-s3.s3.ap-east-1.amazonaws.com/tooth_filling.jpg");

        ItemListResponse.Item item3 = new ItemListResponse.Item();
        item3.setId(3);
        item3.setName("Tooth Extraction");
        item3.setImage_url("https://poly-sehs4701-groupproject-s3.s3.ap-east-1.amazonaws.com/tooth_extraction.jpg");

        ItemListResponse.Item item4 = new ItemListResponse.Item();
        item4.setId(4);
        item4.setName("Root Canal Treatment");
        item4.setImage_url("https://poly-sehs4701-groupproject-s3.s3.ap-east-1.amazonaws.com/root_canal_treatment.jpg");

        ItemListResponse.Item item5 = new ItemListResponse.Item();
        item5.setId(5);
        item5.setName("Dental Checkup");
        item5.setImage_url("https://poly-sehs4701-groupproject-s3.s3.ap-east-1.amazonaws.com/dental_checkup.jpg");

        List<ItemListResponse.Item> itemList = Arrays.asList(item1, item2, item3, item4, item5);

        // Create Response
        response = new ItemListResponse(itemList);
        response.setCode(0);
        response.setMessage("success");
    }

    @Test
    void testGetItemList() {
        // Arrange
        when(itemService.getList()).thenReturn(response);

        // Act
        ItemListResponse result = itemService.getList();

        // Assert
        assertNotNull(result);
        assertEquals(0, result.getCode());
        assertEquals("success", result.getMessage());
        assertNotNull(result.getItemList());
        assertEquals(5, result.getItemList().size());

        // Assert Item 1
        ItemListResponse.Item item1 = result.getItemList().get(0);
        assertEquals(1, item1.getId());
        assertEquals("Teeth Cleaning", item1.getName());
        assertEquals("https://poly-sehs4701-groupproject-s3.s3.ap-east-1.amazonaws.com/teeth_cleaning.jpg", item1.getImage_url());

        // Assert Item 2
        ItemListResponse.Item item2 = result.getItemList().get(1);
        assertEquals(2, item2.getId());
        assertEquals("Tooth Filling", item2.getName());
        assertEquals("https://poly-sehs4701-groupproject-s3.s3.ap-east-1.amazonaws.com/tooth_filling.jpg", item2.getImage_url());

        // Assert Item 3
        ItemListResponse.Item item3 = result.getItemList().get(2);
        assertEquals(3, item3.getId());
        assertEquals("Tooth Extraction", item3.getName());
        assertEquals("https://poly-sehs4701-groupproject-s3.s3.ap-east-1.amazonaws.com/tooth_extraction.jpg", item3.getImage_url());

        // Assert Item 4
        ItemListResponse.Item item4 = result.getItemList().get(3);
        assertEquals(4, item4.getId());
        assertEquals("Root Canal Treatment", item4.getName());
        assertEquals("https://poly-sehs4701-groupproject-s3.s3.ap-east-1.amazonaws.com/root_canal_treatment.jpg", item4.getImage_url());

        // Assert Item 5
        ItemListResponse.Item item5 = result.getItemList().get(4);
        assertEquals(5, item5.getId());
        assertEquals("Dental Checkup", item5.getName());
        assertEquals("https://poly-sehs4701-groupproject-s3.s3.ap-east-1.amazonaws.com/dental_checkup.jpg", item5.getImage_url());

        // Verify service call
        verify(itemService, times(1)).getList();
    }
}