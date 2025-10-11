package com.example.evervow.controller;

import com.example.evervow.entity.User;
import com.example.evervow.repository.UserRepository;
import com.example.evervow.dto.UserCreateDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:3000", "https://evervow.vercel.app"})
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 사용자 생성 (간단 등록)
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserCreateDto userDto) {
        try {
            // 이메일 중복 체크
            if (userDto.getEmail() != null && userRepository.existsByEmail(userDto.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }

            User user = new User();
            user.setName(userDto.getName());
            user.setEmail(userDto.getEmail());
            user.setPhone(userDto.getPhone());

            User saved = userRepository.save(user);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // 사용자 조회
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable UUID id) {
        return userRepository.findById(id)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }

    // 이메일로 사용자 조회
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }

    // 전화번호로 사용자 조회
    @GetMapping("/phone/{phone}")
    public ResponseEntity<User> getUserByPhone(@PathVariable String phone) {
        return userRepository.findByPhone(phone)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }
}
