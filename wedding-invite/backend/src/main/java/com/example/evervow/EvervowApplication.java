package com.example.evervow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.example.evervow")
public class EvervowApplication {
    public static void main(String[] args) {
        SpringApplication.run(EvervowApplication.class, args);
    }
}

