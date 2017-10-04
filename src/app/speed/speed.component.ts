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

  isChecked: boolean;

  bgColor: string = 'BBFFFF';

  constructor() { }

  ngOnInit() { }

  public onChkBoxChanged(value:boolean){
    this.isChecked = value;
    console.log('box is: ' + value);
    if (value) {
      this.bgColor = 'FF8888';
    } else {
      this.bgColor = 'BBFFFF';
    }
}

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
//Number((this.kilo * 2.20462262).toFixed(4))

  calcMpsFromKph(): number{
    return Number((this.kph/3600 * 1000).toFixed(4));
  }
  calcMphFromKph(): number{
    return Number((this.kph * 0.621371192).toFixed(4));    
  }
  calcKphFromMps(): number{
    return Number((this.mps * 3600 / 1000).toFixed(4));
  }
  calcMphFromMps(): number{
    return Number((this.mps * 2.23693629).toFixed(4));
  }
  calcKphFromMph(): number{
    return Number((this.mph * 1.609344).toFixed(4));
  }
  calcMpsFromMph(): number{
    return Number((this.mph / 23693629).toFixed(4));
  }
}

