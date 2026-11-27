package com.example.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.pro1.Admin;
import com.example.repository.AdminRepository;

@Service
public class AdminService {

    private final AdminRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(
            AdminRepository repository,
            PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean authenticateAdmin(String username, String password) {

        Optional<Admin> admin = repository.findByUsername(username);

        if (admin.isPresent()) {
            return passwordEncoder.matches(
                password,
                admin.get().getPassword()
            );
        }

        return false;
    }
}