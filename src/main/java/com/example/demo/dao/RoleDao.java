package com.example.demo.dao;

import com.example.demo.models.Role;

import java.util.List;

public interface RoleDao {
    public List<Role> getAllRoles();
    Role getRole(long id);
}
