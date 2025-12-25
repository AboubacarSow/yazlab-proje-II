import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar : MatSnackBar) { }

  success(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['toast-success'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  error(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: ['toast-error'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  info(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2500,
      panelClass: ['toast-info'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
}

