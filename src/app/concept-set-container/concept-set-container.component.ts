import { Component, OnInit } from '@angular/core';
import {ConceptService} from '../services/concept-service';
import {ConceptSet} from '../models/concept/concept-set';
import {first} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {EditConceptSetDialogComponent} from './edit-concept-set-dialog/edit-concept-set-dialog.component';

@Component({
  selector: 'app-concept-set-container',
  templateUrl: './concept-set-container.component.html',
  styleUrls: ['./concept-set-container.component.scss']
})
export class ConceptSetContainerComponent implements OnInit {

  public conceptSets: ConceptSet[];

  constructor(private conceptService: ConceptService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getConceptSets();
  }

  openDialog(set: ConceptSet | null) {
    const ref = this.dialog.open(EditConceptSetDialogComponent, {
      width: '90vw',
      height: '90vh',
      data: set,
      disableClose: true
    });

    this.getConceptSets();
  }

  getConceptSets() {
    this.conceptService.getConceptSetsForPicker()
      .subscribe(resp => this.conceptSets = resp);
  }

}
