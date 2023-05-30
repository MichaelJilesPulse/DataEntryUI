import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatListModule} from '@angular/material/list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { DataDictionaryContainerComponent } from './data-dictionary-container/data-dictionary-container.component';
import { DataDictionaryTableComponent } from './data-dictionary-container/data-dictionary-table/data-dictionary-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EditDataDictionaryComponent } from './data-dictionary-container/edit-data-dictionary/edit-data-dictionary.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { DdVariableRefManagerComponent } from './data-dictionary-container/edit-data-dictionary/dd-variable-ref-manager/dd-variable-ref-manager.component';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ConceptSetContainerComponent } from './concept-set-container/concept-set-container.component';
import { EditConceptSetDialogComponent } from './concept-set-container/edit-concept-set-dialog/edit-concept-set-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AlertDialogComponent } from './utilities/alert-dialog/alert-dialog.component';
import { DdVariableContainerComponent } from './dd-variable-container/dd-variable-container.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ConceptSetPickerComponent } from './concept-set-container/concept-set-picker/concept-set-picker.component';
import { ConceptSetRefManagerComponent } from './concept-set-container/concept-set-ref-manager/concept-set-ref-manager.component';
import { LongitudinalPeriodManagerComponent } from './dd-variable-container/longitudinal-period-manager/longitudinal-period-manager.component';
import { DdVariablePickerComponent } from './dd-variable-picker/dd-variable-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    DataDictionaryContainerComponent,
    DataDictionaryTableComponent,
    EditDataDictionaryComponent,
    DdVariableRefManagerComponent,
    ConceptSetContainerComponent,
    EditConceptSetDialogComponent,
    AlertDialogComponent,
    DdVariableContainerComponent,
    ConceptSetPickerComponent,
    ConceptSetRefManagerComponent,
    LongitudinalPeriodManagerComponent,
    DdVariablePickerComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatListModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        HttpClientModule,
        MatTableModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatInputModule,
        MatIconModule,
        DragDropModule,
        MatSelectModule,
        MatDialogModule,
        MatSortModule,
        MatCheckboxModule,
        MatSlideToggleModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
