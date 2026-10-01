package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pro1.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem , Integer>{

}
