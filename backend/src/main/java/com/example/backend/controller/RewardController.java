package com.example.backend.controller;

import com.example.backend.entity.Reward;
import com.example.backend.service.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reward")
public class RewardController {

    @Autowired
    private RewardService rewardService;

    @GetMapping
    public List<Reward> getAllRewards() {
        return rewardService.getAllRewards();
    }

    @GetMapping("/{id}")
    public Reward getRewardById(@PathVariable Long id) {
        return rewardService.getRewardById(id);
    }

    @PostMapping
    public Reward savePayment(@RequestBody Reward reward) {
        return rewardService.saveReward(reward);
    }

    @DeleteMapping("/{id}")
    public void deletePaymentById(@PathVariable Long id) {
        rewardService.deleteRewardById(id);
    }

}
