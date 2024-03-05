package com.example.springbootWithPostgresql;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SpringbootWithPostgresqlApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootWithPostgresqlApplication.class, args);
	}

}
