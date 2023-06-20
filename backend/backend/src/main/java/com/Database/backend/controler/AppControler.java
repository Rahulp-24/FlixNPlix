package com.Database.backend.controler;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.Database.backend.entity.Subscription;

import com.Database.backend.entity.User;

import com.Database.backend.service.SubService;

import com.Database.backend.service.UserService;




@RestController
@CrossOrigin(origins="http://localhost:4200")
//@CrossOrigin(origins="*")


public class AppControler {
	@Autowired
	UserService userService;
	
	
	@Autowired
	SubService subService;

	@PostMapping(path = "/addUser")
	public ResponseEntity<User> addUser(@RequestBody User newUser) {
		User user = userService.save(newUser);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@GetMapping(path = "/user/{userid}")
	public ResponseEntity<List<User>> getUser(@PathVariable Integer userid) {
		System.out.println("getmapping");
		List<User> listUser = userService.findByUserid(userid);
		System.out.println(listUser);
		return new ResponseEntity<>(listUser, HttpStatus.OK);
	}
	@GetMapping(path = "email/{emailId}")
	public ResponseEntity<List<User>> getUser(@PathVariable String emailId) {
		List<User> listUser = userService.findByEmailId(emailId);
		return new ResponseEntity<>(listUser, HttpStatus.OK);
	}



	@PostMapping(path = "addSub")
	public ResponseEntity<Subscription> addSub(@RequestBody Subscription newSub) {
		Subscription subscription = subService.save(newSub);
		return new ResponseEntity<>(subscription, HttpStatus.OK);
	}
	

	@GetMapping(path = "/Sub/{userid}")
	public ResponseEntity<List<Subscription>> getSub(@PathVariable Integer userid) {
		List<Subscription> listSub = subService.findByuserid(userid);
		return new ResponseEntity<>(listSub, HttpStatus.OK);
	}
	@DeleteMapping(path = "deleteSub/{sId}")
	public ResponseEntity <String> delSub(@PathVariable Integer sId) {
		subService.deleteById(sId);
		return new ResponseEntity<>("deleted",HttpStatus.OK);
	}
	
	
	




	
}
