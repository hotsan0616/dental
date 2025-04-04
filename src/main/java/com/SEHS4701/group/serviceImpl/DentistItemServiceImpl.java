package com.SEHS4701.group.serviceImpl;

import com.SEHS4701.group.dto.DentistItemByDentistIdResponse;
import com.SEHS4701.group.dto.DentistItemByIdResponse;
import com.SEHS4701.group.dto.DentistItemListResponse;
import com.SEHS4701.group.model.DentistItem;
import com.SEHS4701.group.repository.DentistItemRepository;
import com.SEHS4701.group.service.DentistItemService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DentistItemServiceImpl implements DentistItemService {
    private final DentistItemRepository dentistRepository;
    private final ModelMapper modelMapper;

    public DentistItemServiceImpl(DentistItemRepository dentistRepository, ModelMapper modelMapper) {
        this.dentistRepository = dentistRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public DentistItemListResponse getList() {
        List<DentistItem> dentistItems = dentistRepository.findAll();
        if(dentistItems.isEmpty()) {
            throw new RuntimeException("No dentist item found");
        }
        return new DentistItemListResponse(dentistItems.stream()
                .map(dentistItem -> modelMapper.map(dentistItem, DentistItemListResponse.DentistItem.class))
                .collect(Collectors.toList()));
    }

    @Override
    public DentistItemByIdResponse getById(Integer id) {
        DentistItem dentistItem = dentistRepository.findById(id).orElseThrow(() -> new RuntimeException("No Dentist item found"));
        return new DentistItemByIdResponse(modelMapper.map( dentistItem, DentistItemByIdResponse.DentistItem.class));
    }

    @Override
    public DentistItemByDentistIdResponse getByDentistId(Integer dentistId) {
        List<DentistItem> dentistItems = dentistRepository.findDentistItemByDentistId(dentistId);
        if(dentistItems.isEmpty()) {
            throw new RuntimeException("No dentist item found");
        }
        return new DentistItemByDentistIdResponse(dentistItems.stream()
                .map(dentistItem -> modelMapper.map(dentistItem, DentistItemByDentistIdResponse.DentistItem.class))
                .collect(Collectors.toList()));
    }
}