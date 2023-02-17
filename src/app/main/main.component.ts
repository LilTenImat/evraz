import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
import { mockMachines } from '../interfaces/machine';
@Component({
    selector: 'main-screen',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainComponent implements OnInit {

    readonly machines = mockMachines;

    constructor(
    ) {
    }

    ngOnInit() { }
}