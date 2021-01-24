package com.example.demo.dao;

import com.example.demo.models.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
public class UserDaoImp implements UserDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> index() {
        List<User> users = entityManager.createQuery("from User").getResultList();
        return users;
    }

    @Override
    public User show(Long id) {
        User user = entityManager.createQuery("from User where id = :id", User.class)
                .setParameter("id", id)
                .getSingleResult();
        return user;
    }

    @Override
    public void save(User user) {

        entityManager.persist(user);
    }

    @Override
    public void update(Long id, User updatedUser) {
        User user = show(id);
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setAge(updatedUser.getAge());
        user.setEmail(updatedUser.getEmail());
        user.setRoles(updatedUser.getRoles());
        user.setPassword(updatedUser.getPassword());

    }

    @Override
    public void delete(Long id) {
        User user = show(id);
        entityManager.remove(user);
    }

    @Override
    public User loadUserByUserName(String username) {
        Query query = entityManager.createQuery("from User where username = :username", User.class);
        query.setParameter("username", username);
        List<User> users = query.getResultList();
        if (users.isEmpty()) {
            throw new UsernameNotFoundException(username);
        }
        return users.get(0);
    }

}
