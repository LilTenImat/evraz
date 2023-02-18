import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Observer, pipe, scan, tap } from 'rxjs';
import { AnonymousSubject, Subject } from 'rxjs/internal/Subject';
import {webSocket} from 'rxjs/webSocket';
import { mockExhausters } from '../interfaces/exhauster';


const URL = 'ws://localhost:8080/ws'
export interface Message {
    source: string;
    content: string;
}

@Injectable({providedIn: 'root'})
export class DataService {
    readonly mock = mockExhausters;

    // private subject!: AnonymousSubject<MessageEvent>;
    // public messages: Subject<Message>;

    private data = new Subject<{[key: string]: number}>();
    public data$ = this.data.asObservable().pipe(
        tap(val => console.log(val['moment'], val['SM_Exgauster\\[0:0]'])),
        scan( (all, current) => [...all, current], [] as any ),
        pipe((arr: any) => arr.length > 100 ? arr.slice(1, 100) : arr)
    ) as Observable<{[key: string]: number}[]>
    
    constructor() {
        const sock = webSocket(URL);
        sock.subscribe((ev: any) => {
            sock.next({message: 'ping'});
            // this.data.next(JSON.parse(ev.data));
            console.log(ev['moment'])
        })
    }
    
    public getExhausterName(id: string){
        return this.mock.find(e => e.id == id)?.name || '???';
    } 

    // public connect(url: string): AnonymousSubject<MessageEvent> {
    //     if (!this.subject) {
    //         this.subject = this.create(url);
    //         console.log("Successfully connected: " + url);
    //     }
    //     return this.subject;
    // }

    // private create(url: string): AnonymousSubject<MessageEvent> {
    //     let ws = new WebSocket(url);
    //     let observable = new Observable((obs: Observer<MessageEvent>) => {
    //         ws.onmessage = (ev: MessageEvent) => { 
    //             const f = obs.next.bind(obs); 
    //             // ws.send('ping');
    //             f(ev);
    //         };
    //         ws.onerror = obs.error.bind(obs);
    //         ws.onclose = obs.complete.bind(obs);
    //         return ws.close.bind(ws);
    //     });
    //     let observer = {
    //         error: () => null,
    //         complete: () => null,
    //         next: (data: Object) => {
    //             console.log('Message sent to websocket: ', data);
    //             if (ws.readyState === WebSocket.OPEN) {
    //                 ws.send(JSON.stringify(data));
    //             }
    //         }
    //     };
    //     return new AnonymousSubject<MessageEvent>(observer, observable);
    // }

}