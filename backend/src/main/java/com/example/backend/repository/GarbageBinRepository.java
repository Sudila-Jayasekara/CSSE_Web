package com.example.backend.repository;

import com.example.backend.entity.GarbageBin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GarbageBinRepository extends JpaRepository<GarbageBin, Long> {
}
