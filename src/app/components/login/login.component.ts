import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {


  constructor(private _AuthService:AuthService , private _Router:Router){}

  msgError:string='';

  isLoading:boolean = false;
  loginSubscribe:Subscription = new Subscription();


 loginForm:FormGroup = new FormGroup({
   email : new FormControl(null ,[Validators.required, Validators.email]),
   password : new FormControl(null ,[Validators.required ,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),

 })


 ngOnDestroy(): void {
   this.loginSubscribe.unsubscribe();
}



 handlform():void{
  if(this.loginForm.valid){

   this.isLoading = true;

   

this.loginSubscribe =   this._AuthService.setLogin(this.loginForm.value).subscribe({
     next:(Response)=>{
       
       if(Response.message=="success"){

        localStorage.setItem('uToken', Response.token);

        this._AuthService.saveUserData();
         this.isLoading = false;

          this._Router.navigate(['/home' ,])
       }
     },
     error:(err:HttpErrorResponse)=>{
       this.isLoading = false;

this.msgError = err.error.message ; 

},
   })

  } 
  else{
    this.loginForm.markAllAsTouched()
  }
 }


}
