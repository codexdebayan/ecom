import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private route: Router, private product: ProductService) {}
  menuType: string = 'defaullt';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | product[];
  cartItems = 0 ;

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        // console.warn(val.url);
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.warn('In seller area');
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        }
        else if(localStorage.getItem('user')){
          this.menuType='user';
          if(localStorage.getItem('user')){
            let userStorage = localStorage.getItem('user');
            let userData = userStorage && JSON.parse(userStorage);
            this.userName = userData.name;
          }
        }
        
        else {
          console.warn('Outside seller');
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart')
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;

    }

    this.product.cartData.subscribe((items)=>{
      this.cartItems = items.length
    })
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) => {
        // console.warn(result)
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }
  submitSearch(val: string) {
    this.route.navigate([`search/${val}`]);
  }
}
