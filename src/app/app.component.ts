import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, } from '@angular/material/snack-bar';


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
  numSeats: number;

  constructor(private snackBar: MatSnackBar) {
    this.initializeSeats();
  }

  initializeSeats() {
    for (let i = 0; i < this.totalSeats; i++) {
      this.seats.push(true); // true means seat is available, false means seat is booked
    }
  }

  toggleSeat(index: number) {
    this.seats[index] = !this.seats[index];
  }

  bookSeats(numSeats: number) {
    if (numSeats <= 0 || numSeats > this.seatsPerRow) {
      this.openSnackBar('Invalid number of seats.');
      return;
    }
    if (numSeats > 7) {
      this.openSnackBar('You cannot book more than 7 seats at a time.');
      return;
    }

    let startSeatIndex = -1; // Declare and initialize startSeatIndex here
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
      this.openSnackBar('No available seats.');
      return;
    }

    for (let i = startSeatIndex; i < startSeatIndex + numSeats; i++) {
      this.seats[i] = false;
      this.selectedSeats.push(i + 1);
    }

    this.openSnackBar(`Booked ${numSeats} seats.`);
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'bottom';
    
config.panelClass = ['snack-bar-custom'];
    config.panelClass = ['snack-bar-custom', 'highest-z-index'];
  
    const snackBarRef = this.snackBar.open(message, 'Close', config);
  }
  
}
