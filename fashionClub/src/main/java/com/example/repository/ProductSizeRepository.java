
package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.pro1.ProductSize;

@Repository
public interface ProductSizeRepository
        extends JpaRepository<ProductSize, Integer> {

    List<ProductSize> findByProductProductId(Integer productId);

    void deleteByProductProductId(Integer productId);

}
