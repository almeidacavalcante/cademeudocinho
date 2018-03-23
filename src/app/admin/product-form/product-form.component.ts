import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { ProductService } from '../../services/product/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take'
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  //Creating an Observable Category List
  categories$
  product = {}
  id;

  //Injectin the category Service on the constructor
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService){

    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p)
  }

  save(product){
    if(this.id) this.productService.update(this.id, product)
    else this.productService.create(product)

    this.router.navigate(['/admin/products'])
  }

  delete(){
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
