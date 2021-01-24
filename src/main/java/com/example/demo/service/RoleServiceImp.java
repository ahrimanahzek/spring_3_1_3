package com.example.demo.service;

import com.example.demo.dao.RoleDao;
import com.example.demo.models.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class RoleServiceImp implements RoleService{

    @Autowired
    private RoleDao roleDao;

    @Transactional(readOnly = true)
    @Override
    public List<Role> getAllRoles() {
        return roleDao.getAllRoles();
    }
}

