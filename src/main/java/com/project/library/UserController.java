package com.project.library;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.library.UserRepository;
import com.project.library.LibraryUser;



@Controller
@RequestMapping(path = "/user")
public class UserController {

	@Autowired
    UserIdentifier identifier;
    @Autowired
    UserRepository users;


    public UserController(UserRepository applicationUserRepository
                          ) {

        this.users = applicationUserRepository;
    }
    
    //Lista wszystkich uzytkownikow
    @PostMapping(path = "/all")
    public @ResponseBody
    Iterable<LibraryUser> getAllUser() {
        return users.findAll();
    }
    
    //Rejestracja
    @PostMapping(path = "/register", produces = MediaType.APPLICATION_JSON_VALUE, consumes = "application/json")
    public @ResponseBody
    Map<String, String> register(@RequestBody LibraryUser user) {
        Map<String, String> result = new HashMap<String, String>();
        boolean loginTaken = !(users.getByLogin(user.getLogin()) == null);
        if (!loginTaken) {
            users.save(user);
            result.put("Status", "OK");
            return result;
        } else {
        	result.put("Status", "FAILED_LOGIN");
            return result;
        }
    }
    


    @PostMapping(path = "/delete")
    public @ResponseBody
    Map<String, String> removeBook(@RequestBody LibraryUser libraryUser) {

        users.delete(libraryUser.getId());
        return ApiResponse.responseOK();
    }

}