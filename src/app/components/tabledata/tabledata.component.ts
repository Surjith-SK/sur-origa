import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import {  map, takeUntil } from 'rxjs/operators';
import { FakeService } from 'src/app/services/fake.service';

export interface UserData {
  id: string;
  name: string;
  username: string;
  city: any;
  pincode:any;
  company:any;
  address:any;
}
@Component({
  selector: 'suroriga-tabledata',
  templateUrl: './tabledata.component.html',
  styleUrls: ['./tabledata.component.scss']
})
export class TabledataComponent implements OnInit, OnDestroy, AfterViewInit {
  private latlongfilter: string="latg0";
  @Input() set latlong(value:string){
    this.latlongfilter = value
    this.showAccordingly();

  }
  get latlong():string{
    return this.latlongfilter;
  }
  displayedColumns: string[] = ['id', 'name', 'username','city','pincode', 'company'];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  @Output() userData = new EventEmitter<any>();
  private _unsubscribeAll:Subject<any>;
  /**
   * constructor
   * @param {FakeService} fakeService
   * 
   * @returns
   */
  constructor(private fakeService:FakeService) {
    this._unsubscribeAll = new Subject();
   }

  /**
   * OnInit
   * 
   */
  ngOnInit(): void {
    this.fakeService.ApiResponse.pipe(map((res:any)=>res.map(({id,name,username,company,address,email})=>({id,name,username,company,address,email}))),takeUntil(this._unsubscribeAll)).subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource(res);
    })

  }

  /**
   * ngAfterViewInit
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showAccordingly()
    }, 100);
   
  }

  

  
  /**
   * showAccordingly
   *  
   * 
   */
  showAccordingly(){
    this.dataSource.filterPredicate = (data:UserData) =>{
      if(this.latlongfilter==="latg0"){
        return data?.address.geo.lat>0 
      }
      else if(this.latlongfilter ==="latl0"){
        return data?.address.geo.lat<0
      }
      else if(this.latlongfilter === "longg0"){
        return data?.address.geo.lng>0
      }
      else if(this.latlongfilter === "longl0"){
        return data?.address.geo.lng<0
      }
    }
    this.dataSource.filter = this.latlong.trim().toLowerCase();
    this.displayUser(this.dataSource.filteredData[0])
  }
  /**
   * displayUser
   * @param {UserData} user
   */
  displayUser(user){
    this.userData.emit(user);
  }
  /**
   * 
   * OnDestroy
   */
  ngOnDestroy():void{
    
  }

}
