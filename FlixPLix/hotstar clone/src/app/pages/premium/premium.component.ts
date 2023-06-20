import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
// import { UserServiceService } from 'src/app/service/user-service.service';
import { UserServiceService } from '../../../app/service/user-service.service';
import { Sub } from '../../../app/sub';


@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent implements OnInit {

  deleteSubUrl = "http://localhost:8081/deleteSub/";

  dateTime = new Date();
  gold_validity_Duration = 2;
  platinum_validity_Duration = 4;
  diamond_validity_Duration = 6;

  user_validity_ends_min: number | undefined;
  user_validity_ends_hours: number | undefined;


  sub: Sub = new Sub();
  constructor(private fb: FormBuilder, private userService: UserServiceService, private http: HttpClient) { }


  selectedPlan: any = "Gold";
  planStaus: any = "";
  ngOnInit(): void {
    this.deleteSubUrl = "http://localhost:8081/deleteSub/";

    if (this.userService.userDetails.validityHours == this.dateTime.getHours()) {

      if (this.userService.userDetails.validityMin <= this.dateTime.getMinutes()) {
        this.userService.userDetails.planStaus = "";

        this.deleteSubscription();
      }
    }
    else if (this.userService.userDetails.validityHours < this.dateTime.getHours()) {
      this.userService.userDetails.planStaus = "";

      this.deleteSubscription();
    }



  }
  paymentForm: any = this.fb.group({
    bankName: [null, Validators.required],
    accountNumber: [null, Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])],
    cvv: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
    planName: [null, Validators.required]


  });

  async deleteSubscription() {
    // console.log(this.userService.userDetails.subId);
    if (this.userService.userDetails.subId > 0) {

      this.deleteSubUrl = this.deleteSubUrl + this.userService.userDetails.subId;
      let p = new Promise((res) => {
        this.http.delete(this.deleteSubUrl).subscribe();
      });
      await p;
      this.userService.userDetails.planStaus = "";

    }
  }
  proccedPayment() {
    if (this.userService.userDetails.planStaus.length < 1) {
      this.userService.userDetails.planStaus = this.paymentForm.value.planName;
      this.planStaus = "you have subscribed to " + this.userService.userDetails.planStaus;
      this.sub.plan = this.paymentForm.value.planName;
      this.sub.userid = this.userService.userDetails.userId;
      // console.log(this.sub)
      if (this.userService.userDetails.planStaus == "Gold") {
        this.dateTime.getHours();
        this.dateTime.getMinutes();

        if (this.dateTime.getMinutes() + this.gold_validity_Duration < 59) {
          this.user_validity_ends_min = (this.dateTime.getMinutes() + this.gold_validity_Duration);
          this.user_validity_ends_hours = this.dateTime.getHours();
          this.sub.validityMin = this.user_validity_ends_min;
          this.sub.validityHours = this.user_validity_ends_hours;

        }
        else {
          this.user_validity_ends_min = (this.dateTime.getMinutes() + this.gold_validity_Duration) % 60;
          this.user_validity_ends_hours = this.dateTime.getHours() + (this.dateTime.getMinutes() + this.gold_validity_Duration) / 60
          this.sub.validityMin = this.user_validity_ends_min;
          this.sub.validityHours = this.user_validity_ends_hours;
        }
        this.userService.userDetails.validityHours = this.sub.validityHours;
        this.userService.userDetails.validityMin = this.sub.validityMin;

      }
      else if (this.userService.userDetails.planStaus == "Platinum") {
        this.dateTime.getHours();
        this.dateTime.getMinutes();

        if (this.dateTime.getMinutes() + this.platinum_validity_Duration < 59) {
          this.user_validity_ends_min = (this.dateTime.getMinutes() + this.platinum_validity_Duration);
          this.user_validity_ends_hours = this.dateTime.getHours();
          this.sub.validityMin = this.user_validity_ends_min;
          this.sub.validityHours = this.user_validity_ends_hours;

        }
        else {
          this.user_validity_ends_min = (this.dateTime.getMinutes() + this.platinum_validity_Duration) % 60;
          this.user_validity_ends_hours = this.dateTime.getHours() + (this.dateTime.getMinutes() + this.platinum_validity_Duration) / 60
          this.sub.validityMin = this.user_validity_ends_min;
          this.sub.validityHours = this.user_validity_ends_hours;
        }
        this.userService.userDetails.validityHours = this.sub.validityHours;
        this.userService.userDetails.validityMin = this.sub.validityMin;

      }
      else if (this.userService.userDetails.planStaus == "Diamond") {
        this.dateTime.getHours();
        this.dateTime.getMinutes();

        if (this.dateTime.getMinutes() + this.diamond_validity_Duration < 59) {
          this.user_validity_ends_min = (this.dateTime.getMinutes() + this.diamond_validity_Duration);
          this.user_validity_ends_hours = this.dateTime.getHours();
          this.sub.validityMin = this.user_validity_ends_min;
          this.sub.validityHours = this.user_validity_ends_hours;

        }
        else {
          this.user_validity_ends_min = (this.dateTime.getMinutes() + this.diamond_validity_Duration) % 60;
          this.user_validity_ends_hours = this.dateTime.getHours() + (this.dateTime.getMinutes() + this.diamond_validity_Duration) / 60
          this.sub.validityMin = this.user_validity_ends_min;
          this.sub.validityHours = this.user_validity_ends_hours;
        }
        this.userService.userDetails.validityHours = this.sub.validityHours;
        this.userService.userDetails.validityMin = this.sub.validityMin;


      }




      this.userService.addSubscription(this.sub).subscribe();

      this.getSubscriptionD();


    }
    else {


      this.planStaus = "You have already subscribed to " + this.userService.userDetails.planStaus;
    }

  }
  subscriptionDetailsUrl: any = "http://localhost:8081/Sub/"
  subscriptionData: any = [];


  //  Checking weather user has already subscribed to any plan when user login.
  async getSubscriptionD() {
    this.subscriptionDetailsUrl = this.subscriptionDetailsUrl + this.userService.userDetails.userId;


    let p = new Promise((res) => {
      this.getSubscriptionStatus().subscribe(data => {
        this.subscriptionData = data;
        res('');
      });

    });
    await p;
    this.subscriptionDetailsUrl = "http://localhost:8081/Sub/";


    this.userService.userDetails.planStaus = this.subscriptionData[0].plan;
    this.userService.userDetails.validityMin = this.subscriptionData[0].validityMin;
    this.userService.userDetails.validityHours = this.subscriptionData[0].validityHours;
    this.userService.userDetails.subId = this.subscriptionData[0].sId;

  }




  getSubscriptionStatus() {
    return this.http.get(this.subscriptionDetailsUrl);
  }


}


    // console.log(data);




