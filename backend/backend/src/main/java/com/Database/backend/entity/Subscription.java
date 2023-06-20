package com.Database.backend.entity;
import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Subscription")

public class Subscription {
	
	@Column( unique=true)
	private int userid;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "sId")
	private int sId;

	@Column(name = "plan")
	private String plan;
	
	private int validityMin;
	
	private int validityHours;


	

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public int getsId() {
		return sId;
	}

	public void setsId(int sId) {
		this.sId = sId;
	}

	public String getPlan() {
		return plan;
	}

	public void setPlan(String plan) {
		this.plan = plan;
	}

	public int getValidityMin() {
		return validityMin;
	}

	public void setValidityMin(int validityMin) {
		this.validityMin = validityMin;
	}

	public int getValidityHours() {
		return validityHours;
	}

	public void setValidityHours(int validityHours) {
		this.validityHours = validityHours;
	}

	@Override
	public String toString() {
		return "Subscription [userid=" + userid + ", sId=" + sId + ", plan=" + plan + ", validityMin=" + validityMin
				+ ", validityHours=" + validityHours + "]";
	}



	
	
}
