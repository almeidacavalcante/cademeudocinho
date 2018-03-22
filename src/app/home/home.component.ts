import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category/category.service';
import { ProductService } from '../services/product/product.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  subscription: Subscription;
  categories$;
  filteredProducts;
  products;
  category: string;

  constructor(
    route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService){

    this.getCategories()
    this.subscription = this.productService.getAll()
    .subscribe(products => this.filteredProducts = this.products = products)

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
    })
  }

  filter(category){
    console.log(category);
    
    if(category === 'all') {
      console.log(this.products);
      this.filteredProducts = this.products
      return this.products
    }

    this.filteredProducts = (category) ?
      this.products.filter(p => p.category.toLowerCase().includes(category.toLowerCase())) :
      this.products;
  }

  getCategories(){
    this.categories$ = this.categoryService.getCategories()
  }

  ngOnInit() {

  }

}
