import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  
  constructor(private seller: SellerService, private router:Router) {}
  authError :string= "";
  showLogin = false;

  ngOnInit(): void {
    // Your initialization code goes here
    this.seller.reloadSeller()
  }

  signUp(data: SignUp): void {
    console.warn(data);
    this.seller.userSignUp(data)
  }
  login(data: SignUp): void {
    // console.warn(data);
    this.authError="";
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
          this.authError="User Email or Password is not correct"
      }
    })
  }

  openLogin(){
    this.showLogin= false
  }

  openSignUp(){
    this.showLogin= true
  }
}