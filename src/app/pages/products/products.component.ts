import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  fetching: boolean = false;
  products: any[] = [];
  cartProducts: any[] = [];
  whishlistProducts: any[] = [];

  constructor(
    private httpClient: HttpClient,
    public db: DbService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetching = true;
    this.db.getProducts();
    this.db.productsSub.subscribe(res => {
      if(res.length !== 0) {
        this.products = Object.assign([], res);
        this.fetching = false;
      }
    })
    // this.fetching = true;
    // this.httpClient.get("https://fakestoreapi.com/products")
    // .subscribe(res => {
    // }, error => {
    //   this.fetching = false;
    // })
  }

  addProductToShoppingCart(prd: any) {
    if(this.db.products.some(x => x["id"] === prd["id"])) {
      let idx = this.db.products.findIndex(x => x["id"] === prd["id"]);
      this.db.products[idx]["quantity"] += 1; 
      this.toast.info(prd['title'], "Alreay Added to Cart, Quantity Updated")
    } else {
      this.db.products.push({
        ...prd,
        "quantity": 1
      });
      this.toast.success(prd['title'], "Product Added to Cart")
    }
    // this.db.prodSub.next([...this.cartProducts]);
  }

  addProductToWhishList(prd: any) {
    if(!this.db.whishlistProducts.some(x => x["id"] === prd["id"])) {
      this.db.whishlistProducts.push({
        ...prd,
        "quantity": 1
      }); 
      this.toast.success(prd['title'], "Product Added to Whishlist")
    } else {
      this.toast.info(prd['title'], "Already Added to Whishlist")
    }
  }

}
