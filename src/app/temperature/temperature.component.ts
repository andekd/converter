import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  celsius: number;
  fahrenheit: number;
  kelvin: number;
  
  constructor() { }

  ngOnInit() { }

  calc(event){
    let callingField = event.target.id;
    if (callingField == 'celsius') {
      this.fahrenheit = this.calcFahrenheitFromCelsius();
      this.kelvin = this.calcKelvinFromCelsius();
    }
    if (callingField == 'fahrenheit') {
      this.celsius = this.calcCelsiusFromFahrenheit();
      this.kelvin = this.calcKelvinFromFahrenheit();
    }
    if (callingField == 'kelvin') {
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
     return Number(((this.celsius * 9/5) + 32).toFixed(4));
    } else {return null;}
  }
  calcKelvinFromCelsius(){
    if (this.celsius != null) {
      return Number((this.celsius - 273.15).toFixed(4)); 
    } else {return null;}
  }
  calcCelsiusFromFahrenheit(){
    if (this.fahrenheit != null) {
      return Number(((this.fahrenheit - 32) * 5/9).toFixed(4));
  } else {return null;}
}
  calcKelvinFromFahrenheit(){
    if (this.fahrenheit != null) {
      return Number(((this.fahrenheit + 459.67) / 1.8).toFixed(4));
  } else {return null;}
}
  calcCelsiusFromKelvin(){
    if (this.kelvin != null) {
      return Number((this.kelvin + 273.15).toFixed(4));
    } else {return null;}
  }
  calcFahrenheitFromKelvin(){
    if (this.kelvin != null) {
      return Number(((this.kelvin * 9/5) - 459.67).toFixed(4));
  } else {return null;}
}
}
