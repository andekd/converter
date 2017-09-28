import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Converter';
  currentConverter: string = 'weigth';
  myEvent(event) {
    this.currentConverter = event.target.id;
    console.log(this.currentConverter);
  }
}
