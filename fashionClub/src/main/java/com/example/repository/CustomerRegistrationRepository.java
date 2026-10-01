package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pro1.CustomerRegistration;

public interface CustomerRegistrationRepository extends JpaRepository<CustomerRegistration, Integer> {

}