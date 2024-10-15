package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserById(Long userId){
        return userRepository.findById(userId).orElse(null);  // Call on instance
    }

    public User saveUser(User user) {
        return userRepository.save(user);  // Call on instance
    }

    public void deleteUserById(Long userId) {
        userRepository.deleteById(userId);  // Call on instance
    }
}
