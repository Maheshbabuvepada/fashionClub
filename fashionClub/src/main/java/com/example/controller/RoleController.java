package com.example.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.pro1.Role;
import com.example.service.RoleService;

@RestController
public class RoleController {

    public RoleService service;

    public RoleController(RoleService service) {
        this.service = service;
    }

    @PostMapping("/roles")
    public Role saveRole(@RequestBody Role role) {
        return service.saveRole(role);
    }

    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return service.getAllRole();
    }

    @GetMapping("/roles/{id}")
    public Role getRoleById(@PathVariable Integer id) {
        return service.getRoleById(id);
    }

    @DeleteMapping("/roles/{id}")
    public void deleteRole(@PathVariable Integer id) {
        service.deleteRole(id);
    }
}
