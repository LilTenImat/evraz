import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'scheme',
    templateUrl: 'scheme.component.html',
    styleUrls: ['scheme.component.less']
})

export class SchemeComponent implements OnInit {
    @Input() id: string = '';
    
    constructor() { }

    ngOnInit() { }
}