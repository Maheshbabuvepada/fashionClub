
package com.example.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.pro1.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {

    List<Cart> findByCustomerId(Integer customerId);

    Optional<Cart> findByCustomerIdAndProductIdAndSize(Integer customerId, Integer productId, String size);

    void deleteByCustomerId(Integer customerId);
}
