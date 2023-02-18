import { Component, Input, OnInit, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiLineHandler } from '@taiga-ui/addon-charts';
import {
    TUI_IS_CYPRESS,
    TuiDay,
    TuiDayLike,
    TuiDayRange,
    TuiMapper,
    TuiMatcher,
    tuiPure,
    TuiHandler,
    EMPTY_ARRAY,
    TuiTime,
} from '@taiga-ui/cdk';
import {TuiPoint} from '@taiga-ui/core';
import { tuiCreateTimePeriods } from '@taiga-ui/kit';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ExhausterData } from 'src/app/interfaces/data';
interface DateRange{
    from: Date,
    to: Date
}

interface TreeNode {
    value?: string;
    path?: string;
    readonly text: string;
    readonly children?: readonly TreeNode[];
}

@Component({
    selector: 'graph',
    templateUrl: 'graph.component.html',
    styleUrls: ['graph.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GraphComponent implements OnInit {
    @Input() id: string = '';
    
    show: TuiDayRange = new TuiDayRange(
        TuiDay.currentLocal().append({month: -1}),
        TuiDay.currentLocal(),
    )

    data: DateRange = {
        from: this.show.from.toLocalNativeDate(),
        to: this.show.to.toLocalNativeDate()
    };

    public readonly maxLength: TuiDayLike = {month: 6};
    public readonly zoom = [1, 10, 30, 60];
    public readonly horizontalLines = 10;
    currentZoom = new FormControl(10);
    
    range = 100;

    constructor(
        @Inject(TUI_IS_CYPRESS) readonly isCypress: boolean,
        
        private dataService: DataService,
    ) {
        this.dataService.data$.subscribe(newValue => {
            const arr = this.graphData.value.slice();
            for(let cp of this.checkedPaths){
                let chartDataIdx = arr.findIndex(data => data.path == cp)
                if(chartDataIdx == -1){
                    chartDataIdx = arr.push({
                        name: 'fuck',
                        path: cp,
                        values: []
                    }) - 1;
                } 

                const pathParts = cp.split(',');
                arr[chartDataIdx].values.push((newValue as any)[pathParts[0]][pathParts[1]])
                arr[chartDataIdx].values = arr[chartDataIdx].values.slice(-50);
            }

            this.graphData.next(arr);

        })
    }

    checkedPaths: string[] = [];

    graphData = new BehaviorSubject<{
        name: string,
        path: string,
        values: number[]
    }[]>([]);

    map = new Map<TreeNode, boolean>();
 
    treeData: TreeNode = {
        text: 'Фильтры',
        children: [
            {
                text: 'Подшипнки',
                children: [
                    {
                        text: '1 ПС',
                        children: [
                            {value: '0000', text: 'T, °С', path: 'bearing_1,temperature'},
                            {value: '0000', text: 'Верт, мм/с', path: 'bearing_1,vibration_axial'},
                            {value: '0000', text: 'Гориз, мм/с', path: 'bearing_1,vibration_horizontal'},
                            {value: '0000', text: 'Ось, мм/с', path: 'bearing_1,vibration_vertical'}
                        ],
                    },
                    {
                        text: '2 ПС',
                        children: [
                            {value: '0000', text: 'T, °С', path: 'bearing_2,temperature'},
                            {value: '0000', text: 'Верт, мм/с', path: 'bearing_2,vibration_axial'},
                            {value: '0000', text: 'Гориз, мм/с', path: 'bearing_2,vibration_horizontal'},
                            {value: '0000', text: 'Ось, мм/с', path: 'bearing_2,vibration_vertical'}
                        ],
                    },
                    {
                        text: '7 ПС',
                        children: [
                            {value: '0000', text: 'T, °С', path: 'bearing_7,temperature'},
                            {value: '0000', text: 'Верт, мм/с', path: 'bearing_7,vibration_axial'},
                            {value: '0000', text: 'Гориз, мм/с', path: 'bearing_7,vibration_horizontal'},
                            {value: '0000', text: 'Ось, мм/с', path: 'bearing_7,vibration_vertical'}
                        ],
                    },
                    {
                        text: '8 ПС',
                        children: [
                            {value: '0000', text: 'T, °С', path: 'bearing_8,temperature'},
                            {value: '0000', text: 'Верт, мм/с', path: 'bearing_8,vibration_axial'},
                            {value: '0000', text: 'Гориз, мм/с', path: 'bearing_8,vibration_horizontal'},
                            {value: '0000', text: 'Ось, мм/с', path: 'bearing_8,vibration_vertical'}
                        ],
                    },
                    {
                        text: '9 ПС',
                        children: [
                            {value: '0000', text: 'T, °С', path: 'bearing_9,temperature'}
                        ],
                    },
                ],
            },
            {value: '0000', text: 'Редуктор', children:[
                {value: '0000', text: 'T на 3 ПС, °С', path: 'bearing_3,temperature'},
                {value: '0000', text: 'T на 4 ПС, °С', path: 'bearing_4,temperature'},
                {value: '0000', text: 'T на 5 ПС, °С', path: 'bearing_5,temperature'},
                {value: '0000', text: 'T на 6 ПС, °С', path: 'bearing_6,temperature'},
            ]},
            {
                text: 'Маслобак',
                children: [
                    {value: '0000', text: 'Уровень масла, %', path: 'oilSystem,oil_level'}, 
                    {value: '0000', text: 'Давление масла, кг/см2', path: 'oilSystem,oil_pressure'}
                ],
            },
            {
                text: 'Газовый коллектор',
                children: [
                    {value: '0000', text: 'T газа, °С', path: 'gasCollector,temperature_before'}, 
                    {value: '0000', text: 'Разряжение, мм.в.ст', path: 'gasCollector,underpressure_before'},
                    // {value: '0000', text: 'Уровень пыли, мг/м3'}, 
                ],
            },
            {
                text: 'Главный привод',
                children: [
                    {value: '0000', text: 'Ток, А', path: 'mainGear,stator_current'}, 
                    {value: '0000', text: 'Ток двигателя, А', path: 'mainGear,rotor_current'},
                    {value: '0000', text: 'Напряжение ротера, кВт', path: 'mainGear,rotor_voltage'}, 
                    {value: '0000', text: 'Напряжение статера, кВт', path: 'mainGear,stator_voltage'}, 
                ],
            },
            {
                text: 'Охладитель',
                children: [
                    {value: '0000', text: 'T воды до, °С', path: 'cooler,water_temperature_before'}, 
                    {value: '0000', text: 'T воды после, °С', path: 'cooler,water_temperature_after'},
                    {value: '0000', text: 'T масла до, °С', path: 'cooler,oil_temperature_before'}, 
                    {value: '0000', text: 'T масла после, °С', path: 'cooler,oil_temperature_after'}, 
                ],
            },
        ],
    };
    ngOnInit() {
        // this.dataService.data$.subscribe((message: any) => {
            //     console.log(message['moment'])
        // });
     }

    mapValues(values: number[]){
        return values.map((val, index) => [index, val] as TuiPoint)
    }
    //  getValues(){
    //     // return []
    //     return this.values.map( (val: {moment: Date, value: number}, index: number) => [index, val.value] as TuiPoint)
    //  }
    
    //  updateTree(val: ExhausterData){
    //     this.treeData.next({
    //         text: 'Фильтры',
    //         children: [
    //             {
    //                 text: 'Подшипнки',
    //                 children: [
    //                     {
    //                         text: '1 ПС',
    //                         children: [
    //                             {value: val.bearing_1.temperature?.toFixed(2), text: 'T, °С', path: 'bearing_1,temperature'},
    //                             {value: val.bearing_1.vibration_axial?.toFixed(2) || '????', text: 'Верт, мм/с', path: 'bearing_1,vibration_axial'},
    //                             {value: val.bearing_1.vibration_horizontal?.toFixed(2) || '????', text: 'Гориз, мм/с', path: 'bearing_1,vibration_horizontal'},
    //                             {value: val.bearing_1.vibration_vertical?.toFixed(2) || '????', text: 'Ось, мм/с', path: 'bearing_1,vibration_vertical'}
    //                         ],
    //                     },
    //                     {
    //                         text: '2 ПС',
    //                         children: [
    //                             {value: val.bearing_2.temperature?.toFixed(2), text: 'T, °С', path: 'bearing_1,temperature'},
    //                             {value: val.bearing_2.vibration_axial?.toFixed(2) || '????', text: 'Верт, мм/с', path: 'bearing_1,vibration_axial'},
    //                             {value: val.bearing_2.vibration_horizontal?.toFixed(2) || '????', text: 'Гориз, мм/с', path: 'bearing_1,vibration_horizontal'},
    //                             {value: val.bearing_2.vibration_vertical?.toFixed(2) || '????', text: 'Ось, мм/с', path: 'bearing_1,vibration_vertical'}
    //                         ],
    //                     },
    //                     {
    //                         text: '7 ПС',
    //                         children: [
    //                             {value: val.bearing_7.temperature?.toFixed(2), text: 'T, °С', path: 'bearing_1,temperature'},
    //                             {value: val.bearing_7.vibration_axial?.toFixed(2) || '????', text: 'Верт, мм/с', path: 'bearing_1,vibration_axial'},
    //                             {value: val.bearing_7.vibration_horizontal?.toFixed(2) || '????', text: 'Гориз, мм/с', path: 'bearing_1,vibration_horizontal'},
    //                             {value: val.bearing_7.vibration_vertical?.toFixed(2) || '????', text: 'Ось, мм/с', path: 'bearing_1,vibration_vertical'}
    //                         ],
    //                     },
    //                     {
    //                         text: '8 ПС',
    //                         children: [
    //                             {value: val.bearing_8.temperature?.toFixed(2), text: 'T, °С', path: 'bearing_1,temperature'},
    //                             {value: val.bearing_8.vibration_axial?.toFixed(2) || '????', text: 'Верт, мм/с', path: 'bearing_1,vibration_axial'},
    //                             {value: val.bearing_8.vibration_horizontal?.toFixed(2) || '????', text: 'Гориз, мм/с', path: 'bearing_1,vibration_horizontal'},
    //                             {value: val.bearing_8.vibration_vertical?.toFixed(2) || '????', text: 'Ось, мм/с', path: 'bearing_1,vibration_vertical'}
    //                         ],
    //                     },
    //                     {
    //                         text: '9 ПС',
    //                         children: [
    //                             {value: val.bearing_9.temperature?.toFixed(2), text: 'T, °С', path: 'bearing_1,temperature'},
    //                         ],
    //                     },
    //                 ],
    //             },
    //             { text: 'Редуктор', children:[
    //                 {value: val.bearing_3.temperature?.toFixed(2), text: 'T на 3 ПС, °С', path: 'bearing_3,temperature'},
    //                 {value: val.bearing_4.temperature?.toFixed(2), text: 'T на 4 ПС, °С', path: 'bearing_4,temperature'},
    //                 {value: val.bearing_5.temperature?.toFixed(2), text: 'T на 5 ПС, °С', path: 'bearing_5,temperature'},
    //                 {value: val.bearing_6.temperature?.toFixed(2), text: 'T на 6 ПС, °С', path: 'bearing_6,temperature'},
    //             ]},
    //             {
    //                 text: 'Маслобак',
    //                 children: [
    //                     {value: val.oilSystem.oil_level?.toFixed(2), text: 'Уровень масла, %', path: 'oilSystem,oil_level'}, 
    //                     {value: val.oilSystem.oil_pressure?.toFixed(2), text: 'Давление масла, кг/см2', path: 'oilSystem,oil_pressure'}
    //                 ],
    //             },
    //             {
    //                 text: 'Газовый коллектор',
    //                 children: [
    //                     {value: val.gasCollector.temperature_before?.toFixed(2), text: 'T газа, °С', path: 'gasCollector,temperature_before'}, 
    //                     {value: val.gasCollector.underpressure_before?.toFixed(2), text: 'Разряжение, мм.в.ст', path: 'gasCollector,underpressure_before'},
    //                     // {value: '0000', text: 'Уровень пыли, мг/м3'}, 
    //                 ],
    //             },
    //             {
    //                 text: 'Главный привод',
    //                 children: [
    //                     {value: val.mainGear.stator_current?.toFixed(2), text: 'Ток, А', path: 'mainGear,stator_current'}, 
    //                     {value: val.mainGear.rotor_current?.toFixed(2), text: 'Ток двигателя, А', path: 'mainGear,rotor_current'},
    //                     {value: val.mainGear.rotor_voltage?.toFixed(2), text: 'Напряжение ротера, кВт', path: 'mainGear,rotor_voltage'}, 
    //                     {value: val.mainGear.stator_voltage?.toFixed(2), text: 'Напряжение статера, кВт', path: 'mainGear,stator_voltage'}, 
    //                 ],
    //             },
    //             {
    //                 text: 'Охладитель',
    //                 children: [
    //                     {value: val.cooler.water_temperature_before?.toFixed(2), text: 'T воды до, °С', path: 'cooler,water_temperature_before'}, 
    //                     {value:  val.cooler.water_temperature_after?.toFixed(2), text: 'T воды после, °С', path: 'cooler,water_temperature_after'},
    //                     {value:  val.cooler.oil_temperature_before?.toFixed(2), text: 'T масла до, °С', path: 'cooler,oil_temperature_before'}, 
    //                     {value:  val.cooler.oil_temperature_after?.toFixed(2), text: 'T масла после, °С', path: 'cooler,oil_temperature_after'}, 
    //                 ],
    //             },
    //         ],
    //     });
    //  }

    newFrom([date, time]: [TuiDay, TuiTime]){
        this.data = {
            from: new Date(date.toLocalNativeDate().getTime() + time?.toAbsoluteMilliseconds() || 0),
            to: date.toLocalNativeDate().getTime() - this.data.to.getTime() > 0 ? date.append({day: 1}).toLocalNativeDate() : this.data.to
        }
    }

    newTo([date, time]: [TuiDay, TuiTime]){
        this.data = {
            from: date.toLocalNativeDate().getTime() - this.data.from.getTime() < 0 ? date.append({day: -1}).toLocalNativeDate() : this.data.to,
            to: new Date(date.toLocalNativeDate().getTime() + time?.toAbsoluteMilliseconds() || 0),
        }
    }

    readonly handler: TuiHandler<TreeNode, readonly TreeNode[]> = item =>
        item.children || EMPTY_ARRAY;
 
    readonly getValue = (item: TreeNode, map: Map<TreeNode, boolean>): boolean | null => {
        const flat = flatten(item);
        const result = !!map.get(flat[0]);
 
        for (let i = 0; i < flat.length; i++) {
            if (result !== !!map.get(flat[i])) {
                return null;
            }
        }
 
        return result;
    };
    readonly horizontalLinesHandler: TuiLineHandler = (index, total) => {
        if(index < total * 0.3) return 'dotted';
        if(index < total * 0.6) return 'dashed';
        return 'solid';
    };
    
    onChecked(path: string, value: boolean): void {
        if(value){
            this.checkedPaths.push(path)
        } else {
            const idx = this.checkedPaths.indexOf(path);
            if(idx != -1)
            this.checkedPaths.splice(idx, 1);
        }
    }

    changeZoom(direction: number){
        const idx = this.zoom.findIndex(z => z == this.currentZoom.value);
        this.currentZoom.setValue(this.zoom[idx + direction]);
    }

    // get range(): TuiDayRange {
    //     return this.computeRange(this.show);
    // }
 
    @tuiPure
    getWidth({from, to}: DateRange): number {
        return TuiDay.lengthBetween(TuiDay.fromLocalNativeDate(from), TuiDay.fromLocalNativeDate(to));
    }
 
    @tuiPure
    getDate(day: TuiDay | number, date: TuiDay): TuiDay {
        return day instanceof TuiDay ? day : date.append({day});
    }
 
    readonly filter: TuiMatcher<[TuiDay, number]> = ([day], {from, to}: TuiDayRange) =>
        day.daySameOrAfter(from) && day.daySameOrBefore(to);
 
    // readonly toNumbers: TuiMapper<ReadonlyArray<[TuiDay, number]>, readonly TuiPoint[]> =
    //     (days, {from}: TuiDayRange) =>
    //         days.map(
    //             ([day, value]) =>
    //                 [TuiDay.lengthBetween(from, day), value] as [number, number],
    //         );
    
    readonly toNumbers: TuiMapper<ReadonlyArray<{moment: Date, value: number}>, readonly TuiPoint[]> =
        (values) =>
            values.map(
                ({moment, value}, index) => [index, value]
            );
 
    onDataChange(data: TuiDayRange): void {
        this.data = {
            from: data.from.toLocalNativeDate(), 
            to: data.to.toLocalNativeDate()
        }
    }
 
    @tuiPure
    private computeRange(range: TuiDayRange): TuiDayRange {
        const {from, to} = range;
        const length = TuiDay.lengthBetween(from, to);
        const dayOfWeekFrom = from.dayOfWeek();
        const dayOfWeekTo = to.dayOfWeek();
        const mondayFrom = dayOfWeekFrom ? from.append({day: 7 - dayOfWeekFrom}) : from;
        const mondayTo = dayOfWeekTo ? to.append({day: 7 - dayOfWeekTo}) : to;
        const mondaysLength = TuiDay.lengthBetween(mondayFrom, mondayTo);
 
        if (length > 60) {
            return new TuiDayRange(
                mondayFrom,
                mondayTo.append({day: mondaysLength % 14}),
            );
        }
 
        if (length > 14) {
            return new TuiDayRange(mondayFrom, mondayTo);
        }
 
        if (length > 7) {
            return new TuiDayRange(from, to.append({day: length % 2}));
        }
 
        return range;
    }
}

function flatten(item: TreeNode): readonly TreeNode[] {
    return item.children
        ? item.children.map(flatten).reduce((arr, item) => [...arr, ...item], [])
        : [item];
}