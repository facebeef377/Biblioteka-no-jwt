package com.project.library;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;


import javax.annotation.PostConstruct;
import java.util.Properties;

@SpringBootApplication
public class LibraryApplication {


	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	    return application.sources(LibraryApplication.class);
	 }
	


	public static void main(String[] args) {
		SpringApplication.run(LibraryApplication.class, args);

	}




}

