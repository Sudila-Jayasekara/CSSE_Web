package com.example.backend.repository;

import com.example.backend.entity.WasteManagement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WasteManagementRepository extends JpaRepository<WasteManagement, Long> {

}
