import {Injectable} from "@angular/core";
//import {Http} from "@angular/http";
//import {ExtractData, HandleError} from "./service-helper";
import {Event} from "../models/event";
//import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventService {
 ///   private eventUrl = "api/events";
///    constructor(private http: Http) {}
    get(): Promise<any[]>{
      //  return this.http.get(this.eventUrl)
            //.toPromise()
          //  .then(ExtractData)
        //    .catch(HandleError);
            return Promise.resolve([
                {id: 1, start_date: "2018-03-22 08:00", end_date: "2018-03-22 13:00", text: "Football: Hall 1 & 2"},
                {id: 2, start_date: "2018-03-20 09:00", end_date: "2018-03-20 13:00", text: "Badminton: Hall 1"},
    ]);}
   //insert update delete
}