
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, timeout } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  DataLogin:any;
  DataCheckLogin:any;
  authenticationState = new ReplaySubject();
  token:any;

  //API_URL = 'http://localhost:8080/api/'; 
  API_URL = 'http://127.0.0.1:8000/api/'; 
  
  TOKEN_KEY = 'PGaOejLnNc7m06TQBLZO9D6NJHygKsLWEUW0k1UJ';

  constructor(
    private http: HttpClient, 
    private platform: Platform,
    public toastController: ToastController,
    private router: Router
  ) {
    this.platform.ready().then(() => {
      this.checkToken();
    });
   }

  //ika token tidak ada maka authenticationState=false
  //jika token ada maka akan memanggil fungsi cekUser 
  checkToken() {
    if(localStorage.getItem(this.TOKEN_KEY)==null || localStorage.getItem(this.TOKEN_KEY)=='') {
      this.authenticationState.next(false);     
    }else{
      this.CekUser().subscribe(data => {
        this.DataCheckLogin=data;
        if(this.DataCheckLogin.status=="success"){
          this.authenticationState.next(true);          
        }else{
          this.authenticationState.next(false);
        }
     },
     err => {
        this.authenticationState.next(false);
      });
    }                                                                                                      
  }

  //cek user di sisi server dengan headers authorize bearer
  //teman-teman dapat membuat fungsi baru untuk request data lainnya dengan header authorize bearer
  CekUser(){
    //ambil data dari localstorage
    let dataStorage=JSON.parse(localStorage.getItem(this.TOKEN_KEY));
     this.token=dataStorage.access_token;    
     console.log('test : ' + this.token);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+this.token
      });   
    return this.http.get(this.API_URL + 'profile', { headers: headers }).pipe(
      timeout(8000),
      tap(Data => {
        return Data;
      })
    );
  }

  //login
  loginApi(credentials, type){  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.API_URL + type, credentials, { headers: headers }).pipe(
      tap(Data => {
        this.DataLogin=Data;
        if(this.DataLogin.status=="success"){
          localStorage.setItem(this.TOKEN_KEY, JSON.stringify(Data));
          this.authenticationState.next(true);
        }else{
          this.authenticationState.next(false);
        }
        return Data;
      })
    );
  }

  //register
  registerApiService(credentials, type) {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.http.post(this.API_URL + type, credentials , {headers: headers}).pipe(
      tap(Data => {
        return Data;
      })
    )
  }

  //checkNumber

  checkNumber(phone, type) {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.http.post(this.API_URL + type, phone , {headers: headers}).pipe(
      tap(Data => {
        return Data;
      })
    )
  }
  //otpConfirmation
  confirmationOtp(credentials, type) {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json'
    });

    return this.http.post(this.API_URL + type, credentials, {headers : headers}).pipe(
      tap(Data => {
        this.DataLogin=Data;
        if(this.DataLogin.status == 'success') {
          localStorage.setItem(this.TOKEN_KEY, JSON.stringify(Data));
          this.authenticationState.next(true)
        }else{
          this.authenticationState.next(false)
        }
        return Data;
      })
    )
  }

  //edit profile

  editProfile(credentials,type){
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.http.post(this.API_URL + type, credentials , {headers: headers}).pipe(
      tap(Data => {
        return Data;
      })
    )
  }

  SaveBookService(credentials,type){
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.http.post(this.API_URL + type, credentials , {headers: headers}).pipe(
      tap(Data => {
        return Data;
      })
    )
  }

  getOrder(credentials,type){
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.http.post(this.API_URL + type, credentials , {headers: headers}).pipe(
      tap(Data => {
        return Data;
      })
    )
  }

  getLayanan(credentials,type){
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.http.post(this.API_URL + type, credentials , {headers: headers}).pipe(
      tap(Data => {
        return Data;
      })
    )
  }

  //logout
  logout() {
    this.authenticationState.next(false);
  }
}