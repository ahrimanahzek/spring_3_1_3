package com.example.demo.dao;

import com.example.demo.models.Role;
import com.example.demo.models.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class RoleDaoImp implements RoleDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Role> getAllRoles() {
        List<Role> roles = entityManager.createQuery("from Role").getResultList();
        return roles;
    }

    @Override
    public Role getRole(long id) {
        return entityManager.find(Role.class, id);

    }

}
