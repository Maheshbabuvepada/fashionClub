package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.pro1.Feedback;
import com.example.repository.FeedbackRepository;


@Service
public class FeedbackService {

	private FeedbackRepository repository;

    public FeedbackService(FeedbackRepository repository) {
        this.repository = repository;
    }
    
    public Feedback saveFeedback(Feedback feedback) {
        return repository.save(feedback);
    }

    public List<Feedback> getAllFeedback() {
        return repository.findAll();
    }

    public Feedback getFeedbackById(Integer FeedbackId) {
        return repository.findById(FeedbackId).orElse(null);
    }

    public void deleteFeedback(Integer FeedbackId) {
        repository.deleteById(FeedbackId);
    }
}
