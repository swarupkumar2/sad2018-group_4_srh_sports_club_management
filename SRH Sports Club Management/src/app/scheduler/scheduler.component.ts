import { Component, OnInit } from '@angular/core';
import {ElementRef, ViewChild, ViewEncapsulation } from "@angular/core";
import "dhtmlx-scheduler";
import {} from "@types/dhtmlxscheduler";
import {EventService} from "../services/event.service";
//import {Event} from "../models/Event";
import { and } from '@angular/router/src/utils/collection';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  styleUrls: ['scheduler.component.css'],
  templateUrl: 'scheduler.component.html',
  providers: [EventService]
})

export class SchedulerComponent implements OnInit {

  @ViewChild("scheduler_here") schedulerContainer: ElementRef;
  constructor(private eventService: EventService){}

  ngOnInit(){
      
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.init(this.schedulerContainer.nativeElement, new Date());
    this.eventService.get()
        .then((data) => {
            scheduler.parse(data, "json");
        })
}
 
}
