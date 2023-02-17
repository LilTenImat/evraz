import { NgModule } from '@angular/core';
import {TuiBreadcrumbsModule, TuiBadgedContentModule, TuiAvatarModule, TuiBadgeModule, TuiInputDateRangeModule, TuiInputModule, TuiDataListWrapperModule, TuiSelectModule} from '@taiga-ui/kit';
import {TuiButtonModule, TuiLinkModule, TuiDropdownModule, TuiSvgModule, TuiExpandModule, TuiPrimitiveTextfieldModule, TuiTextfieldControllerModule, TuiLabelModule, TuiDataListModule} from '@taiga-ui/core';
import { TuiActiveZoneModule, TuiDestroyService, TuiFilterPipeModule, TuiMapperPipeModule, TuiObscuredModule} from '@taiga-ui/cdk';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TuiAxesModule, TuiLineChartModule, TuiLineDaysChartModule} from '@taiga-ui/addon-charts';
@NgModule({
  exports: [
    TuiButtonModule,
    TuiBreadcrumbsModule,
    TuiLinkModule,
    TuiBadgedContentModule,
    TuiAvatarModule,
    TuiActiveZoneModule,
    TuiDropdownModule,
    TuiObscuredModule,
    TuiSvgModule,
    TuiExpandModule,
    TuiBadgeModule,
    ReactiveFormsModule,
    FormsModule,
    TuiLineDaysChartModule,
    TuiInputDateRangeModule,
    TuiInputModule,
    TuiPrimitiveTextfieldModule,
    TuiTextfieldControllerModule,
    TuiLineChartModule,
    TuiFilterPipeModule,
    TuiMapperPipeModule,
    TuiAxesModule,
    TuiLabelModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiSelectModule
  ],
  providers: [TuiDestroyService]
})
export class TaigaModule {}