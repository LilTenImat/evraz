import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { TaigaModule } from "./taiga.module";
import { MainComponent } from "./main/main.component";
import { ExhausterCardComponent } from "./exhauster-card/exhauster-card.component";
import { InfoComponent } from "./info/info.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GraphComponent } from "./info/graph/graph.component";
import { SchemeComponent } from "./info/scheme/scheme.component";
import { LabelsPipe } from "./pipes/labels.pipe";

@NgModule({
	declarations: [
		AppComponent,
		ToolbarComponent,
		MainComponent,
		ExhausterCardComponent,
		InfoComponent,
		MainComponent,
		GraphComponent,
		SchemeComponent,

		LabelsPipe
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
    	ReactiveFormsModule,
		BrowserAnimationsModule,
		TuiRootModule,
		TuiDialogModule,
		TuiAlertModule,
		TaigaModule
	],
	providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
	bootstrap: [AppComponent]
})
export class AppModule { }
