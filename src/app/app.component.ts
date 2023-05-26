import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  totalSeats = 80;
  seatsPerRow = 7;
  lastRowSeats = 3;
  seats: boolean[] = [];
  selectedSeats: number[] = [];

  constructor() {
    this.initializeSeats();
  }

  initializeSeats() {
    for (let i = 0; i < this.totalSeats; i++) {
      this.seats.push(true); // true means seat is available, false means seat is booked
    }
  }

  bookSeats(numSeats: number) {
    if (numSeats <= 0 || numSeats > this.seatsPerRow) {
      console.log('Invalid number of seats.');
      return;
    }
    if (numSeats > 7) {
      console.log('You cannot book more than 7 seats at a time.');
      window.alert('You cannot book more than 7 seats at a time.');
      return;
    }

    let startSeatIndex = -1;
    let availableSeatsInRow = 0;

    for (let i = 0; i < this.totalSeats; i++) {
      if (this.seats[i]) {
        availableSeatsInRow++;

        if (availableSeatsInRow === numSeats) {
          startSeatIndex = i - numSeats + 1;
          break;
        }
      } else {
        availableSeatsInRow = 0;
      }
    }

    if (startSeatIndex === -1) {
      console.log(
        'Seats not available in a single row. Booking in nearby seats.'
      );

      for (let i = 0; i < this.totalSeats; i++) {
        if (this.seats[i]) {
          startSeatIndex = i;
          break;
        }
      }
    }

    if (startSeatIndex === -1) {
      console.log('No seats available.');
      return;
    }

    const bookedSeats = [];
    for (let i = startSeatIndex; i < startSeatIndex + numSeats; i++) {
      this.seats[i] = false; // mark seat as booked
      bookedSeats.push(i + 1);
    }

    this.selectedSeats = bookedSeats;
    console.log('Booked seats:', this.selectedSeats);
  }
}
