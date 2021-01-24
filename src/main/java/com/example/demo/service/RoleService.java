package com.example.demo.service;

import com.example.demo.models.Role;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoleService {
    public List<Role> getAllRoles();
}
