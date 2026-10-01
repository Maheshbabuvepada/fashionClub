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

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name="problem")
public class Problem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "problem_id")
	private Integer problemId;
	
	private Integer customerId;
	
	private Integer employeeId;
	
	private String problemMessage;
	
	private String status="pending";

	public Problem(Integer customerId, Integer employeeId, String problemMessage ) {
		super();
		this.customerId = customerId;
		this.employeeId = employeeId;
		this.problemMessage = problemMessage;
	}
	
	
}
