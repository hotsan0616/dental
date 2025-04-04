package com.SEHS4701.group.service;

import com.SEHS4701.group.dto.DentistItemByDentistIdResponse;
import com.SEHS4701.group.dto.DentistItemByIdResponse;
import com.SEHS4701.group.dto.DentistItemListResponse;

public interface DentistItemService {

	DentistItemListResponse getList();

	DentistItemByIdResponse getById(Integer id);

	DentistItemByDentistIdResponse getByDentistId(Integer id);
}