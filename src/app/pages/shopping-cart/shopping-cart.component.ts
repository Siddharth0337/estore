import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public totalItems: number = 0;
  public totalPrice: number = 0;

  constructor(
    public db: DbService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.calculate();
  }
  
  addPrdToWishlist(prd: any, removeBool: boolean, prdIdx: number) {
    this.db.addProductToWhishList(prd, removeBool, prdIdx);
    this.calculate();
  }
  
  removeProductFromCart(prdIdx: number) {
    let elements = this.db.products.splice(prdIdx, 1);
    this.toast.info(elements[0]['title'], "Product Removed from Cart");
    this.calculate();
  }
  
  calculate() {
    this.totalItems = this.db.products.reduce((prev, next) => prev + next['quantity'], 0)
    this.totalPrice = this.db.products.reduce((prev, next) => prev + (next['price'] * next['quantity']), 0);
  }

}
