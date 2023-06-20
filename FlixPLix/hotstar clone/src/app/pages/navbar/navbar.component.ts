import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { UserServiceService } from 'src/app/service/user-service.service';
import { UserServiceService } from '../../../app/service/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserServiceService, private router:Router) { }

  ngOnInit(): void {
  }
  title = 'FlixPlix';
  // navbg:any;
  
  logOut(){
    
    this.router.navigate(['login']);
  }

}
