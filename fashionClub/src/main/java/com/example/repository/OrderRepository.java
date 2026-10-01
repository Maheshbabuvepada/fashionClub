package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pro1.Orders;

public interface OrderRepository extends JpaRepository<Orders , Integer>{

}
