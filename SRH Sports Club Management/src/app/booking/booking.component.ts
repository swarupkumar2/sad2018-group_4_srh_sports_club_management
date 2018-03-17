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
  OnlyDisplayMessage = '';
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
  curruser = '';

  constructor(public db: AngularFireDatabase, public firebaseAuth: AuthService, public authserve: AngularFireAuth) {
    //var user = this.firebaseAuth.auth().currentUser;
    this.date_code = new Date();

    this.slots = db.list('slots').valueChanges();
    var date = new Date();
    this.currentDate = date.toJSON().substr(0, 10).split("-").join("");
    this.selectedDate = this.currentDate;
    this.selectedDateNormal = this.currentDate;

    this.calculateBookingsInfo();

  }


  onSubmitSlot() {

    if(this.currentDate > this.selectedDate){
      alert('you cant book');

    }
    else {

      this.db.list('/groundBooking/'+this.selectedDate+"/").set(this.itemValue,"Username");
      this.itemValue = '';
    }
  }


  onSubmitDate() {
    this.selectedDate = this.selectedDateNormal.replace('-', '');
    this.selectedDate = this.selectedDate.replace('-', '');
    this.selectedDate = this.selectedDate.replace(" ", "");

    this.date_code = new Date();
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
          temp.value = snapshot.payload.val();
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

