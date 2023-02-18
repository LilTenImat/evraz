import {Inject, Pipe, PipeTransform} from '@angular/core';
import {TuiDay, TuiDayRange, TuiMonth} from '@taiga-ui/cdk';
import {TUI_MONTHS} from '@taiga-ui/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
 
interface DateRange{
    from: Date,
    to: Date
}

@Pipe({
    name: `labels`,
})
export class LabelsPipe implements PipeTransform {
    constructor(
        @Inject(TUI_MONTHS) private readonly months$: Observable<readonly string[]>,
    ) {}
 
    transform({from, to}: DateRange, initialLength?: number): Observable<readonly string[]> {
        const length = TuiDay.lengthBetween(TuiDay.fromLocalNativeDate(from), TuiDay.fromLocalNativeDate(to));
 
        if (length > 90) {
            return this.months$.pipe(
                map(months =>
                    Array.from(
                        {length: TuiMonth.lengthBetween(TuiDay.fromLocalNativeDate(from), TuiDay.fromLocalNativeDate(to)) + 1},
                        (_, i) => months[TuiDay.fromLocalNativeDate(from).append({month: i}).month],
                    ),
                ),
            );
        }
 
        const range = Array.from({length}, (_, day) => TuiDay.fromLocalNativeDate(from).append({day}));
        const mondays = onlyMondays(range);
        const days = range.map(String);
 
        if (length > 60) {
            return of(even(mondays));
        }
 
        if (length > 14) {
            return of(mondays);
        }
 
        if (length > 7) {
            return of(even(days));
        }

        if(length > 1){
            return of(days);
        }

        const h = (to.getDate()  - from.getDate()) / (initialLength || 10); 
        return of( (new Array((initialLength || 10))).map((_, idx) => ( new Date(from.getDate() + h)).toLocaleTimeString('ru', {hour: 'numeric', minute:'numeric'} ) ));


    }
}
 
function onlyMondays(range: readonly TuiDay[]): readonly string[] {
    return range.filter(day => !day.dayOfWeek()).map(String);
}
 
function even<T>(array: readonly T[]): readonly T[] {
    return array.filter((_, i) => !(i % 2));
}