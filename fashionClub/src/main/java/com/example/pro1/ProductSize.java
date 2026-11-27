
package com.example.pro1;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "product_size")
public class ProductSize {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private String size;

    private Integer stock = 0;
}
