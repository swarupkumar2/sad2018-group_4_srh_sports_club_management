import { Component, OnInit } from '@angular/core';

import {ElementRef, ViewChild, ViewEncapsulation } from "@angular/core";
import "dhtmlx-scheduler";
import {} from "@types/dhtmlxscheduler";

// @Component({
//   selector: 'app-scheduler',
//   templateUrl: './scheduler.component.html',
//   styleUrls: ['./scheduler.component.css']
// })

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  styleUrls: ['scheduler.component.css'],
  templateUrl: 'scheduler.component.html'
})

export class SchedulerComponent implements OnInit {
  @ViewChild("scheduler_here") schedulerContainer: ElementRef;
  constructor() { }

  ngOnInit(){
    scheduler.init(this.schedulerContainer.nativeElement, new Date());
  }

}
