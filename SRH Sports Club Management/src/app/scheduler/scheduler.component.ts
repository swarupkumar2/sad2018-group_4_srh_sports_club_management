import { Component, OnInit } from '@angular/core';
import {ElementRef, ViewChild, ViewEncapsulation } from "@angular/core";
import "dhtmlx-scheduler";
import {} from "@types/dhtmlxscheduler";
import {EventService} from "../services/event.service";
import {Event} from "../models/Event";
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

    scheduler.attachEvent("onEventAdded", (id, ev) => {
        this.eventService.insert(this.serializeEvent(ev))
            .then((response)=> {
                if(response.id != id){
                    scheduler.changeEventId(id, response.id);
                }
            })
    });

    scheduler.attachEvent("onEventChanged", (id, ev) => {
        this.eventService.update(this.serializeEvent(ev));
    });

    scheduler.attachEvent("onEventDeleted", (id) => {
        this.eventService.remove(id);
    });
    
    this.eventService.get()
        .then((data) => {
            scheduler.parse(this.extractBody(data), "json");
        })
}

private serializeEvent(data: any, insert: boolean = false): Event {
  var result = {};

  for(let i in data){
      if(i.charAt(0) == "$" || i.charAt(0) == "_") continue;
      if(insert && i == "id") continue;
      if(data[i] instanceof Date){
          result[i] = scheduler.templates.xml_format(data[i]);
      } else {
          result[i] = data[i];
      }
  }
  return result as Event;
}

private extractBody(data: any): Event[] {
    var result = [];
    var event: Event;

    for(let i in data){
        event = data[i];
        result.push(event);
    }
    return result;

}
 
}
