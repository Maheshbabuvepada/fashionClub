package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.pro1.Employee;
import com.example.repository.EmployeeRepository;

@Service
public class EmployeeService {

    private EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public Employee saveEmployee(Employee employee) {
       return repository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Employee getEmployeeById(Integer employeeId) {
        return repository.findById(employeeId).orElse(null);
    }

    public void deleteEmployee(Integer employeeId) {
        repository.deleteById(employeeId);
    }
}
