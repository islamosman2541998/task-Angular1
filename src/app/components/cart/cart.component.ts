import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _CartService:CartService){}

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:(response)=>{
        console.log(response)
      },
      error:(err)=>{
        console.log(err)

      }
    })
    
  }

}
