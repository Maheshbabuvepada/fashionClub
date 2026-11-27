
package com.example.pro1;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Integer cartId;

    private Integer customerId;
    private Integer productId;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;
    private String addedDate;
    private String size;

    public Cart(Integer customerId, Integer productId, Integer quantity,
                BigDecimal unitPrice, BigDecimal totalPrice,
                String addedDate, String size) {
        this.customerId = customerId;
        this.productId = productId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.totalPrice = totalPrice;
        this.addedDate = addedDate;
        this.size = size;
    }
}
