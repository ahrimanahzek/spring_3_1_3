package com.example.demo.dao;



import com.example.demo.models.User;

import java.util.List;

public interface UserDAO {
    public List<User> index();

    public User show(Long id);

    public void save(User person);

    public void update(Long id, User updatedPerson);

    public void delete(Long id);

    public User loadUserByUserName(String username);
}
