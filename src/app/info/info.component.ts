import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { BreadcrumpsService, breadcrump } from '../services/breadcrumps.service';
import { DataService } from '../services/data.service';
@Component({
    selector: 'info',
    templateUrl: 'info.component.html',
    styleUrls: ['info.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class InfoComponent implements OnInit {

    mode: BehaviorSubject<'scheme' | 'graph'> = new BehaviorSubject<'scheme' | 'graph'>('scheme');
    mode$ = this.mode.asObservable();
    
    id: BehaviorSubject<string> = new BehaviorSubject<string>('');

    name$: Observable<string>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private bcService: BreadcrumpsService,
        private dataService: DataService
    ) { 
        this.route.queryParams.subscribe(params => {
            const view = params['view'];
            this.mode.next(view || 'scheme');
        })
        this.route.params.subscribe(params => {
            const Id = params['Id'];
            this.id.next(Id || '');
            this.bcService.updateBreadcrumps(Id ? [
                this.bcService.getCurrentBreadcrumps()[0],
                {
                    link: `/${Id}`, title: `Состояние эксгаустера ${dataService.getExhausterName(Id)}`
                }
            ] : [
                this.bcService.getCurrentBreadcrumps()[0]
            ])
        })

        this.name$ = this.id.asObservable().pipe(
            map(id => dataService.getExhausterName(id))
        )
    }

    ngOnInit() {
    }

    toggle(mode: 'scheme' | 'graph'){
        if(this.mode.value != mode){
            this.router.navigate([], {queryParams: {view: mode}});
        }
    }
}