package com.example.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.pro1.CartInformation;

public interface CartInformationRepository
        extends JpaRepository<CartInformation, Integer> {

    List<CartInformation> findByCustomerId(Integer customerId);
}