import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../data-type';
import { BehaviorSubject, throwIfEmpty } from 'rxjs';
import { Router } from '@angular/router';
('@angular/router');
@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(data: SignUp) {
    let result = this.http
      .post('http://localhost:3000/seller', data, {
        observe: 'response',
      })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      });
    return false;
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: Login) {
    console.warn(data)
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    { observe: 'response' }).subscribe((result:any)=>{
        console.warn(result)
        if(result && result.body.length){
          console.warn("User logged in")
          localStorage.setItem('seller',JSON.stringify(result.body))
          this.router.navigate(['seller-home'])
        }else{
          console.warn("Login failed")
          this.isLoginError.emit(true)

        }
    })
  }
}
