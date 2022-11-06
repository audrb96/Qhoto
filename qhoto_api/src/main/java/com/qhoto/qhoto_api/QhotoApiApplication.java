package com.qhoto.qhoto_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
//@PropertySource("application-local.yaml")
public class QhotoApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(QhotoApiApplication.class, args);
	}

}
