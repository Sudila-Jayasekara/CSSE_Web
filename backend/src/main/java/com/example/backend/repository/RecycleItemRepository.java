package com.example.backend.repository;

import com.example.backend.entity.RecycleItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecycleItemRepository extends JpaRepository<RecycleItem, Long> {

}
