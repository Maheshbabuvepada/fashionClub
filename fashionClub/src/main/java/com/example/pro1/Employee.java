package com.example.pro1;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name="employee")
public class Employee {
  
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="employee_id")
	private Integer employeeId;
	
	private Integer roleId;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private Long phoneNumber;
	private String hireDate;
	
	public Employee(Integer roleId, String firstName, String lastName, String email, String password, Long phoneNumber,
			String hireDate) {
		super();
		this.roleId = roleId;
		this.firstName =firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.hireDate = hireDate;
	}
	
	
}
