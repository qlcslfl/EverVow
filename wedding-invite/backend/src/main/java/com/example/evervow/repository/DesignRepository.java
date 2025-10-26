package com.example.evervow.repository;

import com.example.evervow.entity.Design;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DesignRepository extends JpaRepository<Design, Long> {
    List<Design> findByIsActiveTrue();
    Design findByName(String name);
}

