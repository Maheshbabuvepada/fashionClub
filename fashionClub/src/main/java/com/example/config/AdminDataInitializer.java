package com.example.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.pro1.Admin;
import com.example.repository.AdminRepository;

@Component
public class AdminDataInitializer implements CommandLineRunner {

    private final AdminRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AdminDataInitializer(
            AdminRepository repository,
            PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        String username = System.getenv("APP_ADMIN_USERNAME");
        String password = System.getenv("APP_ADMIN_PASSWORD");

        if (username == null || password == null) {
            System.out.println("Admin credentials not configured.");
            return;
        }

        if (repository.findByUsername(username).isEmpty()) {

            Admin admin = new Admin();
            admin.setUsername(username);
            admin.setPassword(passwordEncoder.encode(password));

            repository.save(admin);

            System.out.println("Initial Admin account created.");
        }
    }
}