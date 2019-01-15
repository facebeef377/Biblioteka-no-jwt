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

	@Autowired
	UserRepository userRepository;

	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	    return application.sources(LibraryApplication.class);
	 }
	


	public static void main(String[] args) {
		SpringApplication.run(LibraryApplication.class, args);

	}

	@PostConstruct
	void init()
	{
		LibraryUser u1=new LibraryUser("user","haslo","Konto1","user");
		u1.setId(1);
		LibraryUser u2=new LibraryUser("admin","admin","Admin","admin");
		u2.setId(2);
		userRepository.save(u1);
		userRepository.save(u2);

		LibraryUser tmp1 = userRepository.getByLogin("user");
		tmp1.setId(1);
		userRepository.save(tmp1);

	}



}

