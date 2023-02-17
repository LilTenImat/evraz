import { Injectable } from '@angular/core';
import { mockExhausters } from '../interfaces/exhauster';


@Injectable({providedIn: 'root'})
export class DataService {
    readonly mock = mockExhausters;
    constructor() { }
    
    public getExhausterName(id: string){
        return this.mock.find(e => e.id == id)?.name || '???';
    } 
}