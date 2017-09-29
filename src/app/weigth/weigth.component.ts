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
    return Number((this.kilo * 2.20462262).toFixed(4));
  }
  calcStonesFromKilo(): number{
    return Number((this.kilo * 0.157473044).toFixed(4));    
  }
  calcKiloFromPounds(): number{
    return Number((this.pound/2.20462262).toFixed(4));
  }
  calcStonesFromPounds(): number{
    return Number((this.pound * 0.0714285714).toFixed(4));
  }
  calcKiloFromStones(): number{
    return Number((this.stone * 6.35029318).toFixed(4));
  }
  calcPoundsFromStones(): number{
    return Number((this.stone * 14).toFixed(4));
  }
}
