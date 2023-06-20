import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { MovieApiServiceService } from '../../../app/service/movie-api-service.service';
// import { UserServiceService } from 'src/app/service/user-service.service';
import { UserServiceService } from '../../../app/service/user-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {


  constructor(private service: MovieApiServiceService, private activatedRouter: ActivatedRoute, private router: Router, private userService: UserServiceService, private http: HttpClient) {

  }
  buttonStatus = false;
  getMovieDetailResult={
    poster_path:"",
    original_title:"",
    overview:""

  };
  getMovieVideoResult: String = "";
  getMovieCastResult: any;
  youtubeSource: String = "";
  freeVideos = new Set(["a8Gx8wiNbs8", "AHmCH7iB_IM", "xgZLXyqbYOc", "Zi88i4CpHe4", "qEVUtrk8_B4"]);

  deleteSubUrl = "http://localhost:8081/deleteSub/";

  dateTime = new Date();

  ngOnInit(): void {

    let getParamId = this.activatedRouter.snapshot.paramMap.get('id');
    // console.log(getParamId, 'getparamid#');

    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getMovieCast(getParamId);


    this.deleteSubUrl = "http://localhost:8081/deleteSub/";
    
    if(this.userService.userDetails.validityHours ==this.dateTime.getHours() ){

      if(this.userService.userDetails.validityMin <= this.dateTime.getMinutes() ){
          this.userService.userDetails.planStaus="";
          this.deleteSubscription();
      }
    }
    else if(this.userService.userDetails.validityHours < this.dateTime.getHours() ){
      this.userService.userDetails.planStaus="";
      
      this.deleteSubscription();
    }
  }

  async deleteSubscription(){
    if(this.userService.userDetails.subId >0){
    this.deleteSubUrl = this.deleteSubUrl + this.userService.userDetails.subId;
    let p = new Promise((res) => {
      this.http.delete(this.deleteSubUrl).subscribe();
    });
    await p;
    this.userService.userDetails.planStaus="";
    
  }
}


  loadUrl() {
    console.log(this.getMovieVideoResult.toString());
    console.log(this.getMovieVideoResult);
    this.router.navigate(['premium']);

  }

  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe(async (result) => {
      
      this.getMovieDetailResult.original_title = await result.original_title;
      this.getMovieDetailResult.overview = await result.overview;
      this.getMovieDetailResult.poster_path = await result.poster_path;

     

    });
  }

  getVideo(id: any) {
    this.service.getMovieVideo(id).subscribe((result) => {
      // console.log(result, 'getMovieVideo#');
      result.results.forEach((element: any) => {
        if (this.userService.userDetails.planStaus.length < 1) {
          if (element.type == "Trailer") {
            this.getMovieVideoResult = element.key;
            if (this.freeVideos.has(element.key)) {
              this.youtubeSource = "https://www.youtube.com/embed/" + this.getMovieVideoResult;
              
              this.buttonStatus = true
            } else {

              this.buttonStatus = false
            }
          }
        }
        else {
          this.getMovieVideoResult = element.key;

          this.youtubeSource = "https://www.youtube.com/embed/" + this.getMovieVideoResult;

          this.buttonStatus = true

        }
      });

    });



  }

  getMovieCast(id: any) {
    this.service.getMovieCast(id).subscribe((result) => {
      console.log(result, 'movieCast#');
      this.getMovieCastResult = result.cast;
    });
  }


}
