
package com.example.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.pro1.CustomerRegistration;
import com.example.service.CustomerRegistrationService;

@RestController
public class CustomerRegistrationController {

    private final CustomerRegistrationService service;

    public CustomerRegistrationController(
            CustomerRegistrationService service) {
        this.service = service;
    }

    // Customer Registration
    @PostMapping("/customers")
    public CustomerRegistration saveCustomer(
            @RequestBody CustomerRegistration customer) {
        return service.saveCustomer(customer);
    }

    // Customer Login
    @PostMapping("/customers/login")
    public ResponseEntity<?> loginCustomer(
            @RequestBody Map<String, String> request) {

        try {
            Map<String, Object> response =
                    service.loginCustomer(
                            request.get("emailId"),
                            request.get("password")
                    );

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // Get All Customers
    @GetMapping("/customers")
    public List<CustomerRegistration> getAllCustomers() {
        return service.getAllCustomers();
    }

    // Get Customer By ID
    @GetMapping("/coustmers/{customerId}")
    public CustomerRegistration getCustomerById(
            @PathVariable Integer customerId) {
        return service.getCustomerById(customerId);
    }

    // Delete Customer
    @DeleteMapping("/coustmers/{customerId}")
    public void deleteCustomer(
            @PathVariable Integer customerId) {
        service.deleteCustomer(customerId);
    }
}
