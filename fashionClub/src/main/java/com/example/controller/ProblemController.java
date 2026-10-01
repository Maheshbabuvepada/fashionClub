package com.example.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.pro1.Problem;
import com.example.service.ProblemService;

@RestController
public class ProblemController {
   
	 public ProblemService service;

	    public ProblemController(ProblemService service) {
	        this.service = service;
	    }

	    @PostMapping("/problem")
	    public Problem saveProblem(@RequestBody Problem problem) {
	       return service.saveProblem(problem);
	    }

	    @GetMapping("/problem")
	    public List<Problem> getAllProblems() {
	        return service.getAllProblems();
	    }

	    @GetMapping("/problem/{problemId}")
	    public Problem getProblemById(@PathVariable Integer problemId) {
	        return service.getProblemById(problemId);
	    }

	    @DeleteMapping("/problem/{problemId}")
	    public void deleteProblem(@PathVariable Integer problemId) {
	        service.deleteProblem(problemId);
	    }
}
