import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weigth',
  templateUrl: './weigth.component.html',
  styleUrls: ['./weigth.component.css']
})
export class WeigthComponent implements OnInit {

  kilo: number;
  pound: number;
  stone: number;
  
  constructor() { }

  ngOnInit() {
  }

  calc(event){
    let callingField = event.target.id;
    if (callingField == 'kilograms') {
      this.pound = this.calcPoundFromKilo();
      this.stone = this.calcStonesFromKilo();
    }
    if (callingField == 'pounds') {
      this.kilo = this.calcKiloFromPounds();
      this.stone = this.calcStonesFromPounds();
    }
    if (callingField == 'stones') {
      this.kilo = this.calcKiloFromStones();
      this.pound = this.calcPoundsFromStones();
    }
  }

  clearAll(){
    this.kilo = null;
    this.pound = null;
    this.stone = null;
  }

  calcPoundFromKilo(): number{
    return this.kilo * 2.20462262;
  }
  calcStonesFromKilo(): number{
    return this.kilo * 0.157473044;    
  }
  calcKiloFromPounds(): number{
    return this.pound/2.20462262;
  }
  calcStonesFromPounds(): number{
    return this.pound * 0.0714285714;
  }
  calcKiloFromStones(): number{
    return this.stone * 6.35029318;
  }
  calcPoundsFromStones(): number{
    return this.stone * 14;
  }
}
