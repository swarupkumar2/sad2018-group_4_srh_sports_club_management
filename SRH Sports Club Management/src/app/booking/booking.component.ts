import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})


export class BookingComponent implements OnInit {

  ngOnInit() {
  }

  title = 'SRH Football Ground Booking';
  description = 'Book your slot';
  DisplayMessageDate = '';
  DisplayMessageSlot = '';
  allSlots = [1, 2, 3];
  date;
  currentDate = '';
  date_code: Date;
  itemValue = '';
  selectedDate = '';
  selectedDateNormal = '';
  slots: Observable<any[]>;
  groundBooking: Observable<any[]>;
  list: Object;
  iterator: Number;
  bookings: Array<any>;
  currentUser = '';
  currentUserEmailName = '';

  constructor(public db: AngularFireDatabase, public authserve: AngularFireAuth) {
    this.date_code = new Date();

    this.slots = db.list('slots').valueChanges();
    var date = new Date();
    this.currentDate = date.toJSON().substr(0, 10).split("-").join("");
    this.selectedDate = this.currentDate;
    this.selectedDateNormal = this.currentDate;

    this.calculateBookingsInfo();

    this.currentUser = this.authserve.auth.currentUser.displayName;
    if (this.authserve.auth.currentUser.email != null) {
      this.currentUserEmailName = this.authserve.auth.currentUser.email.split('@')[0];

    }
    if (this.currentUser == null) {
      this.currentUser = this.currentUserEmailName;
    }
  }

  cancelBooking() {
    alert('Cancel');
  }


  onSubmitSlot() {
    var isExist = false;
    var isNotBooked = false;
    if (!(this.currentDate > this.selectedDate)) {

      this.allSlots.map(slot => {
        if (Number(this.itemValue) == slot) isExist = true;

      });

      this.bookings.map(booking => {
        if (Number(this.itemValue) == booking.key && booking.value == "Not Booked") {
          isNotBooked = true;
        }
      });

      if (isExist && isNotBooked) {
        this.DisplayMessageSlot = '';
        this.db.list('/groundBooking/' + this.selectedDate + "/").set(this.itemValue, this.currentUser + ':' + this.currentUserEmailName);
        this.itemValue = '';
      }

      else if (!isExist) {
        this.DisplayMessageSlot = 'Please select one of given slots';
      }

      else if (!isNotBooked) {
        this.DisplayMessageSlot = 'The selected slot is already booked';
      }
    }
  }


  onSubmitDate() {
    this.DisplayMessageSlot = '';
    this.selectedDate = this.selectedDateNormal.replace('-', '');
    this.selectedDate = this.selectedDate.replace('-', '');
    this.selectedDate = this.selectedDate.replace(" ", "");

    if (this.currentDate > this.selectedDate) {
      this.DisplayMessageDate = 'You cannot book slots for previous days';
    }
    else {
      this.DisplayMessageDate = '';
    }

    this.calculateBookingsInfo();
  }


  calculateBookingsInfo() {
    this.slots = this.db.list('slots').valueChanges();
    this.groundBooking = this.db.list('groundBooking/' + this.selectedDate).snapshotChanges();//snapshotChanges();//[currentDate];
    var bookings = [];

    this.groundBooking.subscribe(data => {
      bookings = [];

      if (data) {
        data.forEach(snapshot => {
          var temp = {
            key: "",
            value: ""
          };
          temp.key = snapshot.key;
          if (snapshot.payload.val().split(':') != null) {
            temp.value = snapshot.payload.val().split(':')[0];
          }
          else {
            temp.value = snapshot.payload.val();
          }
          bookings.push(temp);
        });

        this.allSlots.map(slot => {
          var isExist = false;
          bookings.map(obj => {
            if (obj.key == slot) isExist = true;
          });

          if (!isExist) {
            var temp = {
              key: slot,
              value: "Not Booked"
            }
            bookings.push(temp);
          }
        })
        this.bookings = bookings;

      }
    })
  }
}

