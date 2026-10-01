package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.pro1.Problem;
import com.example.repository.ProblemRepository;

@Service
public class ProblemService {
 
	   private ProblemRepository repository;

	    public ProblemService(ProblemRepository repository) {
	        this.repository = repository;
	    }

	    public Problem saveProblem(Problem problem) {
	        return repository.save(problem);
	    }

	    public List<Problem> getAllProblems() {
	        return repository.findAll();
	    }

	    public Problem getProblemById(Integer problemId) {
	        return repository.findById(problemId).orElse(null);
	    }

	    public void deleteProblem(Integer problemId) {
	        repository.deleteById(problemId);
	    }
}
