package com.example.controller;

import java.util.List;

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

    public CustomerRegistrationService service;

    public CustomerRegistrationController(CustomerRegistrationService service) {
        this.service = service;
    }

    @PostMapping("/customers")
    public CustomerRegistration  saveCoustmer(@RequestBody CustomerRegistration customer) {
        return service.saveCustomer(customer);
    }

    @GetMapping("/customers")
    public List<CustomerRegistration> getAllCustomers() {
        return service.getAllCustomers();
    }

    @GetMapping("/coustmers/{customerId}")
    public CustomerRegistration getCustomerById(@PathVariable Integer customerId) {
        return service.getCustomerById(customerId);
    }

    @DeleteMapping("/coustmers/{customerId}")
    public void deleteCustomer(@PathVariable Integer customerId) {
        service.deleteCustomer(customerId);
    }
}