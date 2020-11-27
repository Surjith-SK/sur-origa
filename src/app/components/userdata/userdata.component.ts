import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'suroriga-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit , OnDestroy {
 @Input() userData:any;
  /**
   * constructor
   * @param
   * 
   * @returns
   */
  constructor() { }

  /**
   * OnInit
   * 
   */
  ngOnInit(): void {
  }
  
  /**
   * 
   * OnDestroy
   */
  ngOnDestroy():void{
    
  }

}

