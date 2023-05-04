import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Concept} from '../../models/concept/concept';
import {ConceptSet} from '../../models/concept/concept-set';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {ConceptService} from '../../services/concept-service';
import {take} from 'rxjs';
import {LookupTable} from '../../models/lookup/lookup-table';
import {LookupService} from '../../services/lookup-service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-edit-concept-set-dialog',
  templateUrl: './edit-concept-set-dialog.component.html',
  styleUrls: ['./edit-concept-set-dialog.component.scss']
})
export class EditConceptSetDialogComponent implements OnInit {

  name: FormControl = new FormControl('', Validators.required);
  description: FormControl = new FormControl('');
  assignedTo: FormControl = new FormControl('');
  id: FormControl = new FormControl('');
  originalId: FormControl = new FormControl('');
  published: FormControl = new FormControl('');

  selectedConcepts: MatTableDataSource<Concept>;
  selectedColumns = ['id', 'defaultLabel', 'sortOrder'];
  lookupConcepts: MatTableDataSource<Concept>;

  lookupTables: LookupTable[];
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<EditConceptSetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConceptSet,
    private conceptService: ConceptService,
    private lookupService: LookupService
  ) { }

  ngOnInit(): void {
    if (this.data != null && this.data != undefined) {
      this.conceptService.getConceptSet({id: this.data.id})
        .pipe(take(1))
        .subscribe(concepts => {
          this.selectedConcepts = new MatTableDataSource<Concept>(concepts);
          this.selectedConcepts.sort = this.sort;
        });
    }
    this.lookupService.getLookupTables().pipe(take(1)).subscribe(tables => this.lookupTables = tables);
  }

}
