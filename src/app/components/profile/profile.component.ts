import { Component, OnInit ,Input} from '@angular/core';
import {ActivatedRoute}from '@angular/router';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonModule } from "@angular/common";
import {Router} from '@angular/router'
import {AuthService} from '../auth/auth.service'
import { map } from 'rxjs//operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(private Activated_Route :ActivatedRoute ,private router:Router,private http:HttpClient ,private order:AuthService,private formBuilder: FormBuilder) {


   }

  ngOnInit(): void {

    this.Getuser();
    this.getorder();
    this.registerForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: [ '',[Validators.required, Validators.minLength(6)]],

  }
  );
  }
  registerForm!: FormGroup;

  userorder=[]

  // userorder=[{"Order_Placed_date": "",
  // "Order_delivered_date": "",
  // "items": [],
  // "order_status": "",
  // "userid": ""}];




  user=[{

"address": "",
"email": "",
"firstName": "",
"gender": "",
"lastName": "",
"phone":""
  }]
  urlbase="https://restaurant98.herokuapp.com/users"


  token=localStorage.getItem("token");
   httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'json/html',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization':`${this.token}`
    }),
    // responseType: 'json' as 'json'
  };

  Getuser(){



    this.http.get(this.urlbase,this.httpOptions).pipe(
      map(resDB=>{
        console.log(resDB)
      const arrposts=[];



        arrposts.push({...resDB});

      return arrposts;
    }

    ))
    .subscribe(posts=>{
    console.log(posts);
    this.user= posts;
    console.log(this.user)

  },err=>{
    if(err instanceof HttpErrorResponse){
      if(err.status===401){
        this.router.navigate(['/login']);
      }
    }
  }


  );

  }
getorder(){

  this.order.GetMethodauth("https://restaurant98.herokuapp.com/order/user").pipe(
    map(resDB=>{
     console.log(resDB)

    const arrposts=[];
     arrposts.push(...resDB);
    return  arrposts;

  }

  ))
  .subscribe(posts=>{
  console.log(posts);
  this.userorder= posts;
  console.log(this.userorder);

}
);

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
httpOptionsEdit = {
  headers: new HttpHeaders({
    'Accept': 'text/html',
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization':`${this.token}`
  }),
  responseType: 'text' as 'json'
};

editphone(phone){

    this.http.patch(`${this.urlbase}/phone/`,{phone:phone},this.httpOptionsEdit).subscribe(posts=>{
      console.log(posts);
    });

}

editname(fname,lname){

  this.http.patch(`${this.urlbase}/name/`,{fname,lname},this.httpOptionsEdit).subscribe(posts=>{
    console.log(posts);
  });

}

editemail(email){
console.log(email);
  this.http.patch(`${this.urlbase}/email/`,{email},this.httpOptionsEdit).subscribe(posts=>{
    console.log(posts);
  });

}


editpass(password){

  this.http.patch(`${this.urlbase}/password/`,{password},this.httpOptionsEdit).subscribe(posts=>{
    console.log(posts);
  });

}

editaddress(address){
  console.log(address);

  this.http.patch(`${this.urlbase}/address/`,{address},this.httpOptionsEdit).subscribe(posts=>{
    console.log(posts);
  });

}

deleteorder(id){
  console.log(id);
  this.http.delete(`https://restaurant98.herokuapp.com/order/user/${id}`,this.httpOptionsEdit).subscribe(posts=>{
    console.log(posts);
  });

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

images;
multipleImages = [];
selectImage(event) {
  debugger;
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
  }
}

selectMultipleImage(event){
  if (event.target.files.length > 0) {
    this.multipleImages = event.target.files;
  }
}



onSubmit(){
  debugger;
  console.log(this.token);
  const formData = new FormData();
  formData.append('file', this.images);

  this.http.post<any>('https://restaurant98.herokuapp.com/upload', formData,this.httpOptionsEdit).subscribe(
    res => {
      debugger;
      console.log(res)
    }


  );
}

}
