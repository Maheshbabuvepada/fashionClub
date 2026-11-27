
package com.example.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.pro1.CustomerRegistration;
import com.example.repository.CustomerRegistrationRepository;

@Service
public class CustomerRegistrationService {

    private final CustomerRegistrationRepository repository;
    private final PasswordEncoder passwordEncoder;

    public CustomerRegistrationService(
            CustomerRegistrationRepository repository,
            PasswordEncoder passwordEncoder) {

        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    // Customer Registration
    public CustomerRegistration saveCustomer(CustomerRegistration customer) {

        String email = customer.getEmailId().trim().toLowerCase();

        if (repository.existsByEmailId(email)) {
            throw new RuntimeException("Email already registered");
        }

        customer.setEmailId(email);

        // Encrypt password using BCrypt
        customer.setPassword(
                passwordEncoder.encode(customer.getPassword())
        );

        return repository.save(customer);
    }

    // Customer Login
    public Map<String, Object> loginCustomer(
            String email, String rawPassword) {

        CustomerRegistration customer =
                repository.findByEmailId(email.trim().toLowerCase());

        if (customer == null ||
                !passwordEncoder.matches(
                        rawPassword, customer.getPassword())) {

            throw new RuntimeException("Invalid email or password");
        }

        if (!"Active".equalsIgnoreCase(customer.getStatus())) {
            throw new RuntimeException("Your account is inactive");
        }

        Map<String, Object> response = new HashMap<>();

        response.put("customerId", customer.getCustomerId());
        response.put("firstName", customer.getFirstName());
        response.put("lastName", customer.getLastName());
        response.put("emailId", customer.getEmailId());

        return response;
    }

    // Get All Customers
    public List<CustomerRegistration> getAllCustomers() {
        return repository.findAll();
    }

    // Get Customer By ID
    public CustomerRegistration getCustomerById(Integer customerId) {
        return repository.findById(customerId).orElse(null);
    }

    // Delete Customer
    public void deleteCustomer(Integer customerId) {
        repository.deleteById(customerId);
    }
}
