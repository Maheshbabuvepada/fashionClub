package com.example.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.pro1.Feedback;
import com.example.service.FeedbackService;

@RestController
public class FeedbackController {
 
	 public FeedbackService service;
	 
	    public FeedbackController(FeedbackService service) {
	        this.service = service;
	    }

	    @PostMapping("/feedback")
	    public Feedback saveFeedback(@RequestBody Feedback feedback) {
	       return service.saveFeedback(feedback);
	    }

	    @GetMapping("/feedback")
	    public List<Feedback> getAllFeedback() {
	        return service.getAllFeedback();
	    }

	    @GetMapping("/feedback/{feedbackId}")
	    public Feedback getFeedbackById(@PathVariable Integer feedbackId) {
	        return service.getFeedbackById(feedbackId);
	    }

	    @DeleteMapping("/feedback/{feedbackId}")
	    public void deleteFeedback(@PathVariable Integer feedbackId) {
	        service.deleteFeedback(feedbackId);
	    }
	    
}
