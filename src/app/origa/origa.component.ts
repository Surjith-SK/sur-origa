import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { FakeService } from '../services/fake.service';

@Component({
  selector: 'suroriga-origa',
  templateUrl: './origa.component.html',
  styleUrls: ['./origa.component.css']
})
export class OrigaComponent implements OnInit, OnDestroy {
  _unsubscribeAll:Subject<any>;
  AllData:any=[];
  percentage:number = 0;
  label:string="Latitude < 0";
  filter:string="latl0";
  userData:any;
 /**  
   * constructor
   * @param {FakeService} fakeService
   * @param {ViewportScroller} viewPortScroller
   * @param {MatSnackBar} _snackBar
   * 
   * @returns 
   * 
   */
  constructor(private fakeService:FakeService ,private viewPortScroller:ViewportScroller,private _snackBar: MatSnackBar) {
    this._unsubscribeAll = new Subject();
   }
   /**
    * OnInit
    */
  ngOnInit(): void {
    this.fakeService.ApiResponse.pipe(debounceTime(500),takeUntil(this._unsubscribeAll),map(res=>{
      return res;
    })).subscribe(res=>{
      this.AllData = res; 
        var count = 0;
        this.AllData.forEach(element => {
            if(element.address.geo.lat < 0){
              count+=1
            }
          });
          this.percentage =  count*10;
        })
      setTimeout(()=>{
        this.openSnackBar();
      },1000)
    
  }

  /**
   * ChartClicked
   * @param {number} value
   */
  ChartClicked(value){
    if(value !== null && value !== undefined){
        var count = 0;
        if(value.label === "Latitude < 0"){
        this.AllData.forEach(element => {
            if(element.address.geo.lat < 0){
              count+=1
            }
          });
          this.filter = "latl0"

        }
          else if(value.label  === "Latitude > 0"){
            this.AllData.forEach(element => {
            if(element.address.geo.lat > 0){
              count+=1
            }
          });
          this.filter = "latg0"

        }
          else if(value.label  === "Longitude < 0"){
            this.AllData.forEach(element => {
            if(element.address.geo.lng < 0){
              count+=1
            }
          });
          this.filter = "longg0"

        }
          else if(value.label  === "Longitude > 0"){
            this.AllData.forEach(element => {
            if(element.address.geo.lng > 0){
              count+=1
            }
          });
          this.filter = "longl0"

        }
        else{

        }
        this.label = value.label;
        this.percentage =  count*10;
        }
  }
  /**
   * collectUserData
   * @param {UserData} value
   */
  collectUserData(value){
    this.userData = value;
    this.viewPortScroller.scrollToAnchor("userData")
  }
  /**
   * openSnackBar
   */
  openSnackBar() {
    this._snackBar.open("Welcome to Surjith Origa Assignment", 'close', {
      duration: 5000,
    });
  }
  /**
   * OnDestroy
   */
  ngOnDestroy():void{
    this._unsubscribeAll.next();
  }

}
