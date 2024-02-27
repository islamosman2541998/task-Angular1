import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  myHeaders:any = {token : localStorage.getItem('uToken',)}

  addToCart(productId:string):Observable<any>{
   return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',
    {productId: productId},
    {
      headers: this.myHeaders
    }
    
    )
  }

  getUserCart():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart` ,
    {
      headers:this.myHeaders
    }) 
  }
}
