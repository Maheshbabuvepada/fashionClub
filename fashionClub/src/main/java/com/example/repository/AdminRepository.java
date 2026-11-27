package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.pro1.Admin;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

    Optional<Admin> findByUsername(String username);

}