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
import { map, Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
 
interface DateRange{
    from: Date,
    to: Date
}

interface TreeNode {
    value?: string;
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

    days: ReadonlyArray<ReadonlyArray<[Date, number]>> = new Array([]);

    values: Observable<TuiPoint[]>;

    constructor(
        @Inject(TUI_IS_CYPRESS) readonly isCypress: boolean,
        
        private dataService: DataService,

        private cdRef: ChangeDetectorRef
    ) {
        
        this.values = this.dataService.data$.pipe(
            map((arr: any[]) => arr.map((val, index) => [index, val['SM_Exgauster\\[0:0]']] as TuiPoint))
        )
    }

    map = new Map<TreeNode, boolean>();
 
    readonly treeData: TreeNode = {
        text: 'Фильтры',
        children: [
            {
                text: 'Подшипнки',
                children: [
                    {
                        text: '1 ПС',
                        children: [
                            {value: '0000', text: 'T, °С'},
                            {value: '0000', text: 'Верт, мм/с'},
                            {value: '0000', text: 'Гориз, мм/с'},
                            {value: '0000', text: 'Ось, мм/с'}
                        ],
                    },
                    {
                        text: '2 ПС',
                        children: [
                            {value: '0000', text: 'T, °С'},
                            {value: '0000', text: 'Верт, мм/с'},
                            {value: '0000', text: 'Гориз, мм/с'},
                            {value: '0000', text: 'Ось, мм/с'}
                        ],
                    },
                    {
                        text: '7 ПС',
                        children: [
                            {value: '0000', text: 'T, °С'},
                            {value: '0000', text: 'Верт, мм/с'},
                            {value: '0000', text: 'Гориз, мм/с'},
                            {value: '0000', text: 'Ось, мм/с'}
                        ],
                    },
                    {
                        text: '8 ПС',
                        children: [
                            {value: '0000', text: 'T, °С'},
                            {value: '0000', text: 'Верт, мм/с'},
                            {value: '0000', text: 'Гориз, мм/с'},
                            {value: '0000', text: 'Ось, мм/с'}
                        ],
                    },
                    {
                        text: '9 ПС',
                        children: [
                            {value: '0000', text: 'T, °С'},
                        ],
                    },
                ],
            },
            {value: '0000', text: 'Редуктор', children:[
                {value: '0000', text: 'T на 3 ПС, °С'},
                {value: '0000', text: 'T на 4 ПС, °С'},
                {value: '0000', text: 'T на 5 ПС, °С'},
                {value: '0000', text: 'T на 6 ПС, °С'},
            ]},
            {
                text: 'Маслобак',
                children: [{value: '0000', text: 'Уровень масла, %'}, {value: '0000', text: 'Давление масла, кг/см2'}],
            },
            {
                text: 'Газовый коллектор',
                children: [
                    {value: '0000', text: 'T газа, °С'}, 
                    {value: '0000', text: 'Разряжение, мм.в.ст'},
                    {value: '0000', text: 'Уровень пыли, мг/м3'}, 
                ],
            },
            {
                text: 'Главный привод',
                children: [
                    {value: '0000', text: 'Ток, А'}, 
                    {value: '0000', text: 'Ток двигателя, А'},
                    {value: '0000', text: 'Напряжение ротера, кВт'}, 
                    {value: '0000', text: 'Напряжение статера, кВт'}, 
                ],
            },
            {
                text: 'Охладитель',
                children: [
                    {value: '0000', text: 'T воды до, °С'}, 
                    {value: '0000', text: 'T воды после, °С'},
                    {value: '0000', text: 'T масла до, °С'}, 
                    {value: '0000', text: 'T масла после, °С'}, 
                ],
            },
        ],
    };
    
    ngOnInit() {
        // this.dataService.data$.subscribe((message: any) => {
            //     console.log(message['moment'])
        // });
     }

    //  getValues(){
    //     // return []
    //     return this.values.map( (val: {moment: Date, value: number}, index: number) => [index, val.value] as TuiPoint)
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
    
    onChecked(node: TreeNode, value: boolean): void {
        flatten(node).forEach(item => this.map.set(item, value));
 
        this.map = new Map(this.map.entries());
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