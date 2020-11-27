import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {  Resolve } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FakeService  implements Resolve<any> {
  //ApiResponse to store the response
  ApiResponse: BehaviorSubject<any>;


  /**
   * constructor
   * @param {HttpClient} http
   * 
   * @returns 
   * 
   */
  constructor(private http:HttpClient) {
    this.ApiResponse = new BehaviorSubject([]);
   }

  /**
   * fakeApiCall
   * 
   */
  fakeApiCall(){
    return this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(res=> {this.ApiResponse.next(res);});
  }

  /**
   * resolver
   */
  resolve():Observable<any>|any{
      return this.fakeApiCall();
  }
}
