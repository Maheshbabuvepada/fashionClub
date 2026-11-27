package com.example.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.repository.AdminRepository;

@Service
public class AdminUserDetailsService implements UserDetailsService {

    private final AdminRepository repository;

    public AdminUserDetailsService(AdminRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        var admin = repository.findByUsername(username)
                .orElseThrow(() ->
                    new UsernameNotFoundException("Admin not found"));

        return User.withUsername(admin.getUsername())
                .password(admin.getPassword())
                .roles("ADMIN")
                .build();
    }
}