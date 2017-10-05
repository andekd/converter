import { Component, OnInit } from '@angular/core';
import { Accuracy } from './accuracy';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  celsius: number;
  celsiusAllDecimals: number = 0.0;
  fahrenheit: number;
  fahrenheitAllDecimals: number = 0.0;
  kelvin: number;
  kelvinAllDecimals: number = 0.0;
  
  public selectedAccuracy: Accuracy = new Accuracy(4, '4');
  public accuracies = [
    new Accuracy(2, 'two'),
    new Accuracy(3, 'three'),
    new Accuracy(4, 'four')
  ]
  public currentAccuracy: number = 4;
  
  constructor() { }

  ngOnInit() { }

  onSelectionChange(value){
    console.log(value);
    this.currentAccuracy = Number(value);
    this.refreshFields()
  }

  refreshFields() {
    console.log('Acc: ' + this.currentAccuracy);
    console.log('celsiusAllDecimals: ' + this.celsiusAllDecimals);
    this.celsius = Number(this.celsiusAllDecimals.toFixed(this.currentAccuracy));
    this.fahrenheit = Number(this.fahrenheitAllDecimals.toFixed(this.currentAccuracy));
    this.kelvin = Number(this.kelvinAllDecimals.toFixed(this.currentAccuracy));
  }


  calc(event){
    let callingField = event.target.id;
    if (callingField == 'celsius') {
      this.celsiusAllDecimals = Number(this.celsius);
      this.fahrenheit = this.calcFahrenheitFromCelsius();
      this.kelvin = this.calcKelvinFromCelsius();
    }
    if (callingField == 'fahrenheit') {
      this.fahrenheitAllDecimals = Number(this.fahrenheit);
      this.celsius = this.calcCelsiusFromFahrenheit();
      this.kelvin = this.calcKelvinFromFahrenheit();
    }
    if (callingField == 'kelvin') {
      this.kelvinAllDecimals = Number(this.kelvin);
      this.celsius = this.calcCelsiusFromKelvin();
      this.fahrenheit = this.calcFahrenheitFromKelvin();
    }
  }

  clearAll(){
    this.celsius = null;
    this.fahrenheit = null;
    this.kelvin = null;
  }

  calcFahrenheitFromCelsius(){
    if (this.celsius != null) {
      this.fahrenheitAllDecimals = (+this.celsius * 9/5) + +32;
     return Number(((+this.celsius * 9/5) + +32).toFixed(this.currentAccuracy));
    } else {return null;}
  }

  calcKelvinFromCelsius(){
    if (this.celsius != null) {
      let absZero: number = 273.15;
      this.kelvinAllDecimals = +this.celsius + +absZero;
      return Number((+this.celsius + +absZero).toFixed(this.currentAccuracy)); 
    } else {return null;}
  }

  calcCelsiusFromFahrenheit(){
    if (this.fahrenheit != null) {
      this.celsiusAllDecimals = (+this.fahrenheit - +32) * 5/9;
      return Number(((+this.fahrenheit - +32) * 5/9).toFixed(this.currentAccuracy));
    } else {return null;}
}

  calcKelvinFromFahrenheit(){
    if (this.fahrenheit != null) {
      this.kelvinAllDecimals = (+this.fahrenheit + +459.67) / 1.8;
      return Number(((+this.fahrenheit + +459.67) / 1.8).toFixed(this.currentAccuracy));
    } else {return null;}
}

  calcCelsiusFromKelvin(){
    if (this.kelvin != null) {
      let absZero: number = 273.15;
      this.celsiusAllDecimals = +this.kelvin - +absZero;
      // need to dived with 1 otherwise number + number seems to be a string...
      return Number(((+this.kelvin - +absZero) / 1.0).toFixed(this.currentAccuracy));
    } else {return null;}
  }

  calcFahrenheitFromKelvin(){
    this.fahrenheitAllDecimals = (+this.kelvin * 9/5) - 459.67;
    if (this.kelvin != null) {
      return Number(((+this.kelvin * 9/5) - 459.67).toFixed(this.currentAccuracy));
    } else {return null;}
  }
}
