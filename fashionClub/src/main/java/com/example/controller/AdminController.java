package com.example.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService service;

    public AdminController(AdminService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> request) {

        String username = request.get("username");
        String password = request.get("password");

        boolean authenticated =
                service.authenticateAdmin(username, password);

        if (authenticated) {
            return ResponseEntity.ok(
                Map.of("message", "Admin login successful")
            );
        }

        return ResponseEntity.status(401).body(
            Map.of("message", "Invalid username or password")
        );
    }
}