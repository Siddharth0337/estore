import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  public products: any[] = [];
  public whishlistProducts: any[] = [];

  productsSub: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  productsRetreived: boolean = false;

  constructor(
    private http: HttpClient,
    private toast: ToastrService
  ) {}

  getProducts() {
    if (!this.productsRetreived) {
      this.http.get('https://fakestoreapi.com/products')
      .subscribe((res) => {
        this.productsSub.next(Object.assign([], res))
        this.productsRetreived = true
      })
    }
  }

  addProductToShoppingCart(prd: any, prdRemoveBool: boolean = false, prdIdx: number = -1) {
    if(this.products.some(x => x["id"] === prd["id"])) {
      let idx = this.products.findIndex(x => x["id"] === prd["id"]);
      this.products[idx]["quantity"] += 1; 
      this.toast.info(prd['title'], "Alreay Added to Cart, Quantity Updated")
    } else {
      this.products.push({
        ...prd,
        "quantity": 1
      });
      this.toast.success(prd['title'], "Product Added to Cart")
    }

    if(prdRemoveBool) {
      this.whishlistProducts.splice(prdIdx, 1);
    }
    // this.prodSub.next([...this.cartProducts]);
  }

  addProductToWhishList(prd: any, prdRemoveBool: boolean = false, prdIdx: number = -1) {
    if(!this.whishlistProducts.some(x => x["id"] === prd["id"])) {
      this.whishlistProducts.push({
        ...prd,
        "quantity": 1
      }); 
      this.toast.success(prd['title'], "Product Added to Whishlist")
    } else {
      this.toast.info(prd['title'], "Already Added to Whishlist")
    }

    if(prdRemoveBool) {
      this.products.splice(prdIdx, 1);
    }
  }

}
