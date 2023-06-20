import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { SearchComponent } from './pages/search/search.component';
import { PremiumComponent } from './pages/premium/premium.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { FlixGuard} from './flix.guard';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  {path:'',redirectTo:"login",pathMatch:"full"},
  {path:'home',component:HomeComponent, canActivate:[FlixGuard]},  
  {path:'signup',component:SignUpComponent,},
  {path:'login',component:LoginComponent},
  {path:'search',component:SearchComponent,canActivate:[FlixGuard]},
  {path:'movie/:id',component:MovieDetailsComponent, canActivate:[FlixGuard]},
  {path:'premium',component:PremiumComponent, canActivate:[FlixGuard]},
  {path:'profile',component:ProfileComponent, canActivate:[FlixGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
