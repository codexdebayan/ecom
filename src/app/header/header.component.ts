import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private route: Router) {}
  menuType : string ="";
  ngOnInit(): void {
    

    this.route.events.subscribe((val:any)=>{
      if(val.url){
        // console.warn(val.url);
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          console.warn("In seller area")
        }else{
          console.warn("Outside seller")
        }
      }
    })
  }
}
