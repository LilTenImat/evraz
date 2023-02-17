import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Bearing, status } from '../interfaces/bearing';
import { Exhauster, exhausterStatus } from '../interfaces/exhauster';

interface Problem{
    idx: number,
    temp?: 'danger' | 'warning' | 'ok',
    vibr?: 'danger' | 'warning' | 'ok'
}

interface bearingsInfo{
    warnings: Problem[],
    normals: {idx: number}[],
    oilStatus: status | null
}

@Component({
    selector: 'exhauster-card',
    templateUrl: 'exhauster-card.component.html',
    styleUrls: ['exhauster-card.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExhausterCardComponent implements OnInit {
    @Input() exhauster?: Exhauster;

    warningsExpanded: boolean = true;
    bearingsExpanded: boolean = false;
    constructor() { }

    ngOnInit() { }

    getColor(status: exhausterStatus): string{
        switch(status){
            case exhausterStatus.DANGER:{
                return 'var(--tui-error-fill)';
            }
            case exhausterStatus.OK:{
                return 'var(--tui-success-fill)';
            }
            case exhausterStatus.WARNING:
            default:{
                return 'var(--tui-warning-fill)';
            }
        }
    }

    getLastChange(): number{
        if(!this.exhauster) return 0;
        return Number((Math.abs(+new Date() - +this.exhauster.rotorLastChanged) / ( 60*60*24) / 1000).toFixed(0));
    }
    getChangePrediction(): number{
        if(!this.exhauster) return 0;
        return Number((Math.abs(+this.exhauster.rotorChangePrediction - +this.exhauster.rotorLastChanged) / ( 60*60*24) / 1000).toFixed(0));
    }

    getChangeStatus(): status{
        const changePredictDuration = this.getChangePrediction() - this.getLastChange();
        if(changePredictDuration <= 2) return status.DANGER;
        if(changePredictDuration <= 5) return status.WARNING;
        return status.OK; 
    }


    getBearingsInfo(){
        const result: bearingsInfo = {
            warnings: [],
            normals: [],
            oilStatus: null
        }

        if(!this.exhauster) return result;

        this.exhauster.bearings.forEach((bearing: Bearing, idx: number) => {
            if( (bearing.temperatureStatus == status.OK) && (bearing.vibrationStatus == status.OK) ){
                result.normals.push({idx: idx + 1});
            } else {
                result.warnings.push({
                    idx: idx + 1,
                    temp: bearing.temperatureStatus == status.DANGER ? 'danger' : (bearing.temperatureStatus == status.WARNING ? 'warning' : 'ok'),
                    vibr: bearing.vibrationStatus == status.DANGER ? 'danger' :  (bearing.vibrationStatus == status.WARNING ? 'warning' : 'ok')
                });
            }
        })

        result.oilStatus = this.exhauster.oilLevelStatus;

        return result;
    }
}