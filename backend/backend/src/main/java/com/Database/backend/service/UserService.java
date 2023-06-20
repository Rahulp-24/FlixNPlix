package com.Database.backend.service;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Database.backend.entity.User;

public interface UserService extends JpaRepository<User,Integer>{

	public List<User> findByUserid(Integer userid);

	public List<User> findByEmailId(String emailId);

}