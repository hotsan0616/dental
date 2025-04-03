package com.SEHS4701.group.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class ItemListResponse extends BaseResponse {
    private List<Item> ItemList;

    public ItemListResponse(List<Item> ItemList) {
        this.ItemList = ItemList;
    }

    @Getter
    @Setter
    public static class Item{
        private Integer id;
        private String name;
        private String image_url;
    }
}
