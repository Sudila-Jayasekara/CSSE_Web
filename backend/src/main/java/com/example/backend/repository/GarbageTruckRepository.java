package com.example.backend.repository;

import com.example.backend.entity.GarbageTruck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GarbageTruckRepository extends JpaRepository<GarbageTruck, Long> {

}
