package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pro1.Payment;

public interface PaymentRepository extends JpaRepository<Payment , Integer>{

}
