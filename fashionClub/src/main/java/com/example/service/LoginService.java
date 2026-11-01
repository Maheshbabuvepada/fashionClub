package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pro1.Login;
import com.example.repository.LoginRepository;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    public Login save(Login login) {
        return loginRepository.save(login);
    }

    public Login getById(Integer loginId) {
        return loginRepository.findById(loginId).orElse(null);
    }

    public List<Login> getAll() {
        return loginRepository.findAll();
    }

    public void delete(Integer loginId) {
        loginRepository.deleteById(loginId);
    }
}