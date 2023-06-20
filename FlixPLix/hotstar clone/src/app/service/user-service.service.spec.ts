
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserServiceService } from './user-service.service';
import { HttpClient } from '@angular/common/http';

describe('UserServiceService', () => {
  let service: UserServiceService;
  let httpclient : HttpClient;
  let httptestocontroler : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserServiceService]
    });
    service = TestBed.inject(UserServiceService);
  });

  beforeEach(()=>{

    service = TestBed.inject(UserServiceService);
    httptestocontroler = TestBed.inject(HttpTestingController);


  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should test user ApiData',()=>{
    const expectedValue = { title: 'Movie Title', rating: 4.5, genre: 'Action' };
    service.addUser().subscribe((userInfo:any)=>{
      expect(userInfo).toEqual(expectedValue);
    })
    const req = httptestocontroler.expectOne("http://localhost:8081/addUser");
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual("json");
    httptestocontroler.verify();
    
  })
});
