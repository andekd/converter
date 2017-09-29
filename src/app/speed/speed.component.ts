import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speed',
  templateUrl: './speed.component.html',
  styleUrls: ['./speed.component.css']
})
export class SpeedComponent implements OnInit {

  kph: number;
  mps: number;
  mph: number;

  constructor() { }

  ngOnInit() { }

  calc(event){
    let callingField = event.target.id;
    if (callingField == 'kph') {
      this.mps = this.calcMpsFromKph();
      this.mph = this.calcMphFromKph();
    }
    if (callingField == 'mps') {
      this.kph = this.calcKphFromMps();
      this.mph = this.calcMphFromMps();
    }
    if (callingField == 'mph') {
      this.kph = this.calcKphFromMph();
      this.mps = this.calcMpsFromMph();
    }
  }

  clearAll(){
    this.kph = null;
    this.mps = null;
    this.mph = null;
  }

  calcMpsFromKph(): number{
    return this.kph/3600 * 1000;
  }
  calcMphFromKph(): number{
    return this.kph * 0.621371192;    
  }
  calcKphFromMps(): number{
    return this.mps * 3600 / 1000;
  }
  calcMphFromMps(): number{
    return this.mps * 2.23693629;
  }
  calcKphFromMph(): number{
    return this.mph * 1.609344;
  }
  calcMpsFromMph(): number{
    return this.mph / 23693629;
  }
}

