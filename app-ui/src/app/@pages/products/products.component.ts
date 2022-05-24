import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';

/////// Cambiar a un archivo 
interface Product {
  name: string,
  description: string;
}

////// TODO: Cambiar a un archivo 
const GET_PRODUCTS = gql`
  {
    products {
      name
      description
    }  
  }
`;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Observable<Product[]>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    // this.products = 
    this.apollo
      .watchQuery({ query: GET_PRODUCTS})
      // .valueChanges.pipe(map((result:any) => result.data.products));
      .valueChanges.subscribe((result: any) => {
        console.log({result});
      });
  }

}
