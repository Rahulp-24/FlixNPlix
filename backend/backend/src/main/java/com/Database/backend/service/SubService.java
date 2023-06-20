package com.Database.backend.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Database.backend.entity.Subscription;

public interface SubService extends JpaRepository<Subscription, Integer> {

	

	List<Subscription> findByuserid(Integer userid);

	List<Subscription> findBysId(Integer sId);

	



	

	
}