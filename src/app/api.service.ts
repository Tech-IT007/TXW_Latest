import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';



@Injectable({
providedIn: 'root'
})
export class ApiService {
private static _responseToken: any = '';
host = "https://techxpertindia.in/api/";
//host = "https://karigrocery.com/api/";
  logout: any;
static get responseToken(): any {
return ApiService._responseToken;
}
static set responseToken(value: any) {
ApiService._responseToken = value;
}

protected header:any = '';

constructor(public httpclient : HttpClient,
 
   ) {

}


setHeader(){
//set header here
return this.header = {
headers: new HttpHeaders({
'Content-Type': 'application/json',

})
};
}




login(credentials:any):Observable<any>{
return this.httpclient.post(this.host + ApiEndPoint.LOGIN, credentials,{observe: 'response'});
}


test(){
if(this.header != '')
console.log(this.header.headers.get("Authorization"));

}

public getToken(): string {
return localStorage.getItem('token');
}

}

export enum ApiEndPoint {
  LOGIN = 'login.php',

  }

  export interface DetailsBody     {
    
    UserName:string;
  Role:string;
 
  }