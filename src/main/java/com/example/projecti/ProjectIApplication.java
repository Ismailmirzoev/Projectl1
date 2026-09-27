package com.example.projecti;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan(basePackages = "com.example.projecti.entity")
@SpringBootApplication
public class  ProjectIApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectIApplication.class, args);
    }

}
