import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderObservable?: Observable<any[]>;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.orderObservable = this.httpClient.get<any[]>("assets/json/orders.json");
  }

}
