package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pro1.Login;
import com.example.service.LoginService;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public Login save(@RequestBody Login login) {
        return loginService.save(login);
    }

    @GetMapping("/{loginId}")
    public Login getById(@PathVariable Integer loginId) {
        return loginService.getById(loginId);
    }

    @GetMapping
    public List<Login> getAll() {
        return loginService.getAll();
    }

    @DeleteMapping("/{loginId}")
    public void delete(@PathVariable Integer loginId) {
        loginService.delete(loginId);
    }
}
