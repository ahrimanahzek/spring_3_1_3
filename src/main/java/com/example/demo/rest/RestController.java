package com.example.demo.rest;

import com.example.demo.models.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> showAllUsers() {
        List<User> allUsers = userService.index();
        return allUsers;
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable long id) {
        User user = userService.show(id);

        return user;
    }

    @PostMapping("/users")
    public User addNewUser(@RequestBody User user) {
        userService.save(user);
        return user;
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        userService.update(user.getId(), user);
        return user;
    }

    @DeleteMapping("/users/{id}")
    public String deleteEmployee(@PathVariable long id) {
        userService.delete(id);
        return "User with ID = " + id + " was deleted";
    }

}
