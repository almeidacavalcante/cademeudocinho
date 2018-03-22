import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from "./../../models/product";
import * as $ from 'jquery';
import { datatables } from "datatables.net";


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  products: Product[];
  filteredProducts: any[];

  constructor(private produtctService: ProductService) { 
    this.subscription = this.produtctService.getAll()
      .subscribe(products => this.filteredProducts = this.products = products)
  }

  applyDataTable(){
    $(document).ready(function() {
      $('#productsTable').DataTable();
    });
  }

  filter(query: string){
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.applyDataTable()
  }
}
