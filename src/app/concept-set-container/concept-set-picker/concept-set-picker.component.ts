import { Component, OnInit } from '@angular/core';
import {ConceptService} from '../../services/concept-service';
import {ConceptSet} from '../../models/concept/concept-set';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EditConceptSetDialogComponent} from '../edit-concept-set-dialog/edit-concept-set-dialog.component';

@Component({
  selector: 'app-concept-set-picker',
  templateUrl: './concept-set-picker.component.html',
  styleUrls: ['./concept-set-picker.component.scss']
})
export class ConceptSetPickerComponent implements OnInit {

  conceptSets: ConceptSet[];
  selectedConcept: ConceptSet | undefined;

  constructor(public conceptService: ConceptService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<ConceptSetPickerComponent>) { }

  ngOnInit(): void {
    this.conceptService.getConceptSetsForPicker().subscribe(result => this.conceptSets = result);
  }

  selectConcept(concept: ConceptSet) {
    this.conceptService.getConceptSet({id: concept.id}).subscribe(result => this.selectedConcept = {...concept, items: result});
  }

  createNewConceptSet() {
    const ref = this.dialog.open(EditConceptSetDialogComponent, {
      width: '90vw',
      height: '90vh',
      data: null
    });

    ref.afterClosed().subscribe(result => {
      this.conceptSets.push(result);
    })
  }

  onSelect() {
    if (this.selectedConcept === null) {
      return;
    }
    this.dialogRef.close(this.selectedConcept);
  }

}
