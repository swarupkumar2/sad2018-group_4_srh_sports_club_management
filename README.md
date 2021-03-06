SRH Sports Club Management - A Web based Application for University Ground & Seminar Hall Booking

SRH Campus Sports at SRH Hochshule Heidelberg, has a fantastic Indoor Ground, Swimming Pool and Gymnasium to support students studying at the SRH to achieve their passion towards sports.

This project aims to implement the "Online Slot Booking" for a groups of students who want to practice any particular kind of Sport (Cricket, Football, BasketBall, Judo, Wrestling, Table Tennis, Badminton etc.,) and to a faculty who wants to conduct a seminar for a particular amount of time. They have to make an advance booking before they are in the SRH Campus Sports. This should also solve the conflict between groups of students managing to play two or more different sport in one single place and will provide the organised way of booking a slot. 

In our project as Views, we have all the components created to serve a purpose (login, dashboard, about, gallery etc.,). 
"app.routes.ts" has routing details of each component upon request for service from client.

In order to get this project up and running locally (Also includes steps followed to implement the project): 

1. Install latest version of Angular & angular-cli using ==> https://angular.io/guide/quickstart and follow the on screen instructions.
2. Install the latest version of NodeJs ==> https://nodejs.org/en/download/
3. Create a Firebase account (just from your google account should do) and create a new project and import the Environment into your
   Angular Project.
4. Make an npm install in the project directory.
5. To make sure you don't have dependency conlflicts => npm install angularfire2 firebase --save 
6. In order to import the DHTMLX scheduler into your project => npm install dhtmlx-scheduler --save & 
   npm install @types/dhtmlxscheduler --save
   
   Our Versions:
    "dhtmlx-scheduler": "^4.4.0",
    "firebase": "^4.10.1",
    "@angular/core": "^5.2.0",

The Authors of the Project:

Karan Vichare,
Eldon Kuzhyelil,
Biswarup Sahoo,
Omar Syed,
Sandesh Athreya
