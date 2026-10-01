package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.pro1.CustomerRegistration;
import com.example.repository.CustomerRegistrationRepository;

@Service
public class CustomerRegistrationService {

    private CustomerRegistrationRepository repository;

    public CustomerRegistrationService(CustomerRegistrationRepository repository) {
        this.repository = repository;
    }

    public CustomerRegistration saveCustomer(CustomerRegistration customer) {
          return repository.save(customer);
    }

    public List<CustomerRegistration> getAllCustomers() {
        return repository.findAll();
    }

    public CustomerRegistration getCustomerById(Integer customerId) {
        return repository.findById(customerId).orElse(null);
    }

    public void deleteCustomer(Integer customerId) {
        repository.deleteById(customerId);
    }
}