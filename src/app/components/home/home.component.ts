import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private _EcomdataService:EcomdataService , private _CartService:CartService){}


  products:any[]= [];
  categories:any[]= [];
  searchTerm:string='';

  addToCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{

      },
      error:()=>{
        
      }
    })
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay:true,
    autoplaySpeed:10,
    navSpeed: 700,
    navText: ['prev', ' next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay:true,
    autoplaySpeed:10,
    navSpeed: 700,
    navText: ['prev', ' next'],
   
    items: 1
      
    ,
   
  }


 ngOnInit(): void {
     this._EcomdataService.getAllProduct().subscribe({
      next:(response)=>{
        this.products = response.data

      }
     });

     this._EcomdataService.getCategories().subscribe({

      next:(response)=>{
this.categories =response.data;
      }

     })
 }


}
