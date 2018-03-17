import {Injectable} from "@angular/core";
import {Event} from "../models/event";
import {Http} from "@angular/http";
import {ExtractData, HandleError} from "./service-helper";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { getLocaleDateTimeFormat } from '@angular/common';


import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { DataSnapshot } from "@firebase/database";

@Injectable()
export class EventService {
 // private eventUrl = "api/event";

 private eventUrl = "https://srh-authentication.firebaseio.com/event.json";

  items: Observable<any[]>;
  child: Observable<any[]>;

	constructor(public db: AngularFireDatabase, private http: Http) {}


	get(): Promise<Event[]>{

		console.log(this.http.get(this.eventUrl).toPromise().catch(HandleError));
		return this.http.get(this.eventUrl)
			.toPromise().catch(HandleError);
	}

/*	get(): Promise<Event[]>{

		this.items = this.db.list('event').snapshotChanges();

		this.items.subscribe(data => {

			console.log(data);

			data.forEach(snapshot => {
				
				var temp = {
					key: "",
					value: ""
				};
				temp.key = snapshot.key;
				temp.value = snapshot.payload.val();
				console.log(temp.value);

			});
		});
		
		return this.promise.then(ExtractData).catch(HandleError);
	}*/
  
/*	insert(event: Event): Promise<Event> {
		return this.http.post(this.eventUrl, JSON.stringify(event))
			.toPromise()
			.then(ExtractData)
			.catch(HandleError);
	}*/

  insert(event: Event): any {

	let ndate = new Date();
	
	console.log(ndate.getTime());

	return this.db.list('event').set(ndate.getTime().toString(), JSON.stringify(event));
	//	return this.db.list('event').push(JSON.stringify(event));
  }

	update(event: Event): Promise<void> {
		return this.http.put(`${this.eventUrl}/${event.id}`, JSON.stringify(event))
			.toPromise()
			.then(ExtractData)
			.catch(HandleError);
  }

	remove(id: number): Promise<void> {
		return this.http.delete(`${this.eventUrl}/${id}`)
			.toPromise()
			.then(ExtractData)
			.catch(HandleError);
	}
}