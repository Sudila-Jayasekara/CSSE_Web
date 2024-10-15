package com.example.backend.service;

import com.example.backend.entity.Reward;
import com.example.backend.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RewardService {
    @Autowired
    private RewardRepository rewardRepository;

    public List<Reward> getAllRewards() {
        return rewardRepository.findAll();
    }

    public Reward getRewardById(Long rewardId) {
        return rewardRepository.findById(rewardId).orElse(null);
    }

    public Reward saveReward(Reward reward) {
        return rewardRepository.save(reward);
    }

    public void deleteRewardById(Long rewardId) {
        rewardRepository.deleteById(rewardId);
    }
}
