import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  constructor(private _ActivatedRoute:ActivatedRoute , private _EcomdataService:EcomdataService){}

  productDetails:any; 

  productSlider: OwlOptions = {
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
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
       let idProduct:any =  params.get("id")

       this._EcomdataService.getIdProduct(idProduct).subscribe({
        next:(response)=>{
         this.productDetails = response.data;

        }
       })
      }
    })
  }

}
