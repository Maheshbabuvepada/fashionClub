package com.example.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.pro1.Employee;
import com.example.service.EmployeeService;

@RestController
public class EmployeeController {

    public EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @PostMapping("/employees")
    public Employee saveEmployee(@RequestBody Employee employee) {
      return  service.saveEmployee(employee);
    }

    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return service.getAllEmployees();
    }

    @GetMapping("/employees/{employeeId}")
    public Employee getEmployeeById(@PathVariable Integer employeeId) {
        return service.getEmployeeById(employeeId);
    }

    @DeleteMapping("/employees/{employeeId}")
    public void deleteEmployee(@PathVariable Integer employeeId) {
        service.deleteEmployee(employeeId);
    }
}