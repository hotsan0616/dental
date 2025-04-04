package com.SEHS4701.group.repository;

import com.SEHS4701.group.model.DentistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DentistItemRepository extends JpaRepository<DentistItem, Integer> {
    public List<DentistItem> findDentistItemByDentistId(Integer dentistId);
}