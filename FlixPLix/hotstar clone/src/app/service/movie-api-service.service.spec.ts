import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieApiServiceService } from './movie-api-service.service';
import { HttpClient } from '@angular/common/http';


describe('MovieApiServiceService', () => {
  let service: MovieApiServiceService;
  
  
  let httpclient : HttpClient;
  let httptestocontroler : HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieApiServiceService]
    });
    service = TestBed.inject(MovieApiServiceService);
  });

  beforeEach(()=>{

    service = TestBed.inject(MovieApiServiceService);
    httptestocontroler = TestBed.inject(HttpTestingController);


  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  

  it('should test banner ApiData',()=>{
    const expectedValue = { title: 'Movie Title', rating: 4.5, genre: 'Action' };
    service.bannerApiData().subscribe((movieDB:any)=>{
      expect(movieDB).toEqual(expectedValue);
    })
    const req = httptestocontroler.expectOne("https://api.themoviedb.org/3/trending/all/week?api_key=08cc33bd5ae3a747598ce2ad84376e66");
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual("json");
    httptestocontroler.verify();
    
  })


});
