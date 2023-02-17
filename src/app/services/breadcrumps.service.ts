import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface breadcrump {
    link: string,
    title: string
}

@Injectable({providedIn: 'root'})
export class BreadcrumpsService {

    private breadcrumps = new BehaviorSubject<breadcrump[]>([{
        link: '', title: 'Прогнозная аналитика эксгаустера'
    }])
    public breadcrumps$ = this.breadcrumps.asObservable();

    constructor() { }

    updateBreadcrumps(val: breadcrump[]){
        this.breadcrumps.next(val);
    }
    getCurrentBreadcrumps(){
        return this.breadcrumps.value;
    }
    
}