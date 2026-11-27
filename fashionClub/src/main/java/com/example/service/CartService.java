
package com.example.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.pro1.Cart;
import com.example.pro1.CartInformation;
import com.example.repository.CartRepository;
import com.example.repository.CartInformationRepository;

@Service
public class CartService {

    private final CartRepository repository;
    private final CartInformationRepository informationRepository;

    public CartService(CartRepository repository,
                       CartInformationRepository informationRepository) {
        this.repository = repository;
        this.informationRepository = informationRepository;
    }

    public List<Cart> getCustomerCart(Integer customerId) {
        return repository.findByCustomerId(customerId);
    }

    public Cart saveCart(Cart cart) {

        Cart existing = repository.findByCustomerIdAndProductIdAndSize(
            cart.getCustomerId(), cart.getProductId(), cart.getSize()
        ).orElse(null);

        String today = LocalDate.now().toString();

        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + cart.getQuantity());
            existing.setTotalPrice(
                existing.getUnitPrice().multiply(
                    BigDecimal.valueOf(existing.getQuantity())
                )
            );

            Cart saved = repository.save(existing);

            CartInformation info = new CartInformation(
                saved.getCartId(), saved.getProductId(),
                saved.getCustomerId(), today, today, true
            );
            informationRepository.save(info);

            return saved;
        }

        cart.setAddedDate(today);
        cart.setTotalPrice(
            cart.getUnitPrice().multiply(BigDecimal.valueOf(cart.getQuantity()))
        );

        Cart saved = repository.save(cart);

        CartInformation info = new CartInformation(
            saved.getCartId(), saved.getProductId(),
            saved.getCustomerId(), today, today, true
        );
        informationRepository.save(info);

        return saved;
    }

    public Cart updateQuantity(Integer cartId, Integer quantity) {
        Cart cart = repository.findById(cartId).orElse(null);

        if (cart == null || quantity == null || quantity < 1) {
            return null;
        }

        cart.setQuantity(quantity);
        cart.setTotalPrice(
            cart.getUnitPrice().multiply(BigDecimal.valueOf(quantity))
        );

        return repository.save(cart);
    }

    public List<Cart> getAllCarts() {
        return repository.findAll();
    }

    public Cart getCartById(Integer cartId) {
        return repository.findById(cartId).orElse(null);
    }

    public void deleteCart(Integer cartId) {
        repository.deleteById(cartId);
    }

    @Transactional
    public void clearCustomerCart(Integer customerId) {
        List<CartInformation> records =
            informationRepository.findByCustomerId(customerId);

        for (CartInformation info : records) {
            info.setStatus(false);
            info.setDateOfUpdation(LocalDate.now().toString());
        }

        informationRepository.saveAll(records);
        repository.deleteByCustomerId(customerId);
    }
}
