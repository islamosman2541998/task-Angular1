import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {

   constructor(private _AuthService:AuthService , private _Router:Router){}

   msgError:string='';

   isLoading:boolean = false;
   registerSubscribe:Subscription = new Subscription();


  registerform:FormGroup = new FormGroup({
    name : new FormControl(null , [Validators.required, Validators.minLength(3)  , Validators.maxLength(20)]),
    email : new FormControl(null ,[Validators.required, Validators.email]),
    password : new FormControl(null ,[Validators.required ,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword : new FormControl(null ,[Validators.required ,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    phone : new FormControl(null ,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

  })


  ngOnDestroy(): void {
    this.registerSubscribe.unsubscribe();
}



  handlform():void{
   if(this.registerform.valid){

    this.isLoading = true;

    

 this.registerSubscribe =   this._AuthService.setRegister(this.registerform.value).subscribe({
      next:(Response)=>{
        
        if(Response.message=="success"){
          this.isLoading = false;

           this._Router.navigate(['/login' ,])
        }
      },
      error:(err:HttpErrorResponse)=>{
        this.isLoading = false;

this.msgError = err.error.message ; 

},
    })

   } 
   else{
    this.registerform.markAllAsTouched();
   }
  }

  
}
