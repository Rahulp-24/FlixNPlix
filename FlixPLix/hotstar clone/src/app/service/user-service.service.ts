import { Injectable } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Sub } from '../sub';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  
  userDetails ={
    userId:1,
    userName:"Rahul",
    userEmail:"rahulhp2405@gmail.com",
    planStaus:"",
    logedIn:0,
    validityMin:0,
    validityHours:0,
    subId:0

  }

  

  addUserUrl:String="http://localhost:8081/addUser";
  
  addSub: String="http://localhost:8081/addSub";
  

  constructor(private http: HttpClient) { }

  addUser(user?:User): Observable <Object>{
    return this.http.post<Object>(`${this.addUserUrl}`,user);
  }
  
  

  addSubscription(sub?:Sub):Observable <Object>{
    return this.http.post<Object>(`${this.addSub}`,sub);
  }

}
