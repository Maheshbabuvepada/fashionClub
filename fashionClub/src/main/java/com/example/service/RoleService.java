package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.pro1.Role;
import com.example.repository.RoleRepository;

@Service
public class RoleService {
  
	 public  RoleRepository repository;
	 
	 public RoleService(RoleRepository repository) {
		 this.repository=repository;
	 }
	 
	 public Role saveRole(Role role) {
		return repository.save(role);
	 }
	 
	 public List<Role> getAllRole(){
		 return repository.findAll();
	 }
	 
	 public Role getRoleById(Integer id) {
		 return repository.findById(id).orElse(null);
	 }
	 
	 public void deleteRole(Integer id) {
		 repository.deleteById(id);
	 }
}
