import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weigth',
  templateUrl: './weigth.component.html',
  styleUrls: ['./weigth.component.css']
})
export class WeigthComponent implements OnInit {
  
  kilo: number;
  kiloAllDecimals: number = 0.0;
  pound: number;
  poundAllDecimals: number = 0.0;
  stone: number;
  stoneAllDecimals: number = 0.0;
  
  entries = [
    {
      id: 2,
      description: '2 decimals'
    },
    {
      id: 3,
      description: '3 decimals'
    },
    {
      id: 4,
      description: '4 decimals'
    }
  ];
  selectedEntry;
  accuracy: number = 4;
  
  constructor() { }
  
  ngOnInit() {
  }

  onSelectionChange(entry) {
    this.selectedEntry = Object.assign({}, this.selectedEntry, entry);
    console.log(this.selectedEntry.id);
    this.accuracy = this.selectedEntry.id;
    this.refreshFields()
  }

  refreshFields() {
    console.log(this.kiloAllDecimals);
    this.kilo = Number(this.kiloAllDecimals.toFixed(this.accuracy));
    this.pound = Number(this.poundAllDecimals.toFixed(this.accuracy));
    this.stone = Number(this.stoneAllDecimals.toFixed(this.accuracy));
  }
  
  calc(event){
    let callingField = event.target.id;
    if (callingField == 'kilograms') {
      this.kiloAllDecimals = Number(this.kilo);
      this.pound = this.calcPoundFromKilo();
      this.stone = this.calcStonesFromKilo();
    }
    if (callingField == 'pounds') {
      this.poundAllDecimals = Number(this.pound);
      this.kilo = this.calcKiloFromPounds();
      this.stone = this.calcStonesFromPounds();
    }
    if (callingField == 'stones') {
      this.stoneAllDecimals = Number(this.stone);
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
    this.poundAllDecimals = this.kilo * 2.20462262;
    return Number((this.kilo * 2.20462262).toFixed(this.accuracy));
  }
  calcStonesFromKilo(): number{
    this.stoneAllDecimals = this.kilo * 0.157473044;
    return Number((this.kilo * 0.157473044).toFixed(this.accuracy));    
  }
  calcKiloFromPounds(): number{
    this.kiloAllDecimals = this.pound/2.20462262;
    return Number((this.pound/2.20462262).toFixed(this.accuracy));
  }
  calcStonesFromPounds(): number{
    this.stoneAllDecimals = this.pound * 0.0714285714;
    return Number((this.pound * 0.0714285714).toFixed(this.accuracy));
  }
  calcKiloFromStones(): number{
    this.kiloAllDecimals = this.stone * 6.35029318;
    return Number((this.stone * 6.35029318).toFixed(this.accuracy));
  }
  calcPoundsFromStones(): number{
    this.poundAllDecimals = this.stone * 14;
    return Number((this.stone * 14).toFixed(this.accuracy));
  }
}
