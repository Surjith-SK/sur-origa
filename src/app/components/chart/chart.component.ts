import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FakeService } from 'src/app/services/fake.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ChartOptions, ChartType } from 'chart.js';
@Component({
  selector: 'suroriga-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  @Output() selectedChart = new EventEmitter<any>();
  data:any=[];
  latg0:number=0;
  latl0:number=0;
  longg0:number=0;
  longl0:number=0;
  dataToPopulate:number[];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontColor: 'white'
      }
    },
    tooltips :{
      backgroundColor:'white',
      callbacks:{
        labelTextColor: function(tooltipItem, chart) { 
           return "black";     
        },
       
      }
    }
  };
  pieChartLabels =  ['Latitude > 0', 'Latitude < 0', 'Longitude > 0', 'Longitude < 0'];
  pieChartType: ChartType = 'pie';
  pieChartLegend:boolean = true;
 // CHART COLOR.
 pieChartColor:any = [
  {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
      'rgba(255,165,0,0.9)',
      'rgba(139, 136, 136, 0.9)',
      'rgba(255, 161, 181, 0.9)'
     
      ]
  }
]
  /**
   * constructor
   * @param
   * 
   */
  constructor(private fakeService: FakeService) {
    this._unsubscribeAll = new Subject();
    
  }

  /**
   * OnInit
   * 
   */
  ngOnInit(): void {
      this.fakeService.ApiResponse.pipe(map((res: any) => res.map(({id,address})=>({id,address}))), takeUntil(this._unsubscribeAll)
      ).subscribe(res => {this.data = res;this.calculatePercentage()})   
  }

  /**
   * Calculate percentage
   * 
   */
  calculatePercentage(){
    this.data.forEach(element => {
      if(element.address.geo.lat > 0){
        this.latg0+=1;
      }
      else {
        this.latl0+=1;
      }
       if(element.address.geo.lng<0){
        this.longl0+=1;

      }
      else {
        this.longg0+=1;
      }
    });
    this.dataToPopulate = [this.latg0,this.latl0,this.longg0,this.longl0];
  }
  /**
   * chartClicked
   * 
   * @param {Event} event
   */
  chartClicked(event){
    var index = null;
    if(event.active.length){
      index = event.active[0]._index;
      var values = {id:index,label:this.pieChartLabels[index]}
      this.selectedChart.emit(values)
      return
    }
    this.selectedChart.emit(index);
  
  }
  /**
   * 
   * OnDestroy
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }

}
