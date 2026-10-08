package com.example.prismcart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.prismcart.repository")
public class PrismcartApplication {

    public static void main(String[] args) {
        SpringApplication.run(PrismcartApplication.class, args);
    }
}