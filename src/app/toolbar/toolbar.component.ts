import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BreadcrumpsService, breadcrump } from '../services/breadcrumps.service';

@Component({
    selector: 'toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ToolbarComponent implements OnInit {
    newNotifications: boolean = true;

    breadcrumps$: Observable<breadcrump[]>;

    constructor(
        private bcService: BreadcrumpsService,
        private router: Router
    ) {
        this.breadcrumps$ = bcService.breadcrumps$;
        this.router.events.subscribe(event => {
            if(event instanceof NavigationEnd){
                if(event.url == '/'){
                    this.bcService.updateBreadcrumps([
                        this.bcService.getCurrentBreadcrumps()[0]
                    ])
                }
            }
        })
    }

    ngOnInit() {
    }

    open = false;

    onClick(): void {
        this.open = !this.open;
    }

    onObscured(obscured: boolean): void {
        if (obscured) {
            this.open = false;
        }
    }

    onActiveZone(active: boolean): void {
        this.open = active && this.open;
    }
}