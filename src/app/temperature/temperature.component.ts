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
     return (this.celsius * 9/5) + 32;
    } else {return null;}
  }
  calcKelvinFromCelsius(){
    if (this.celsius != null) {
      return this.celsius - 273.15;    
    } else {return null;}
  }
  calcCelsiusFromFahrenheit(){
    if (this.fahrenheit != null) {
      return (this.fahrenheit - 32) * 5/9;
  } else {return null;}
}
  calcKelvinFromFahrenheit(){
    if (this.fahrenheit != null) {
      return (this.fahrenheit + 459.67) / 1.8;
  } else {return null;}
}
  calcCelsiusFromKelvin(){
    if (this.kelvin != null) {
      return this.kelvin + 273.15;
    } else {return null;}
  }
  calcFahrenheitFromKelvin(){
    if (this.kelvin != null) {
      return (this.kelvin * 9/5) - 459.67;
  } else {return null;}
}
}
