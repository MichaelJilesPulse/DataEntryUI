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
import {LookupItem} from '../../models/lookup/lookup-item';
import {SelectableItem} from '../../models/ui/selectable-item';

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

  setConcepts: MatTableDataSource<SelectableItem<Concept>>;
  setColumns = ['value.omopConceptId', 'value.defaultLabel', 'value.sortOrder'];
  selectedConcepts: Concept[];

  lookupConcepts: MatTableDataSource<SelectableItem<LookupItem>>;
  lookupColumns = ['selection','value.omopConceptId', 'value.name'];
  selectedLookups: Map<string, LookupItem> = new Map<string, LookupItem>();

  lookupTables: LookupTable[];
  @ViewChild('selectedSort') selectedSort: MatSort;
  @ViewChild('lookupSort') lookupSort: MatSort;

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
          this.setConcepts = new MatTableDataSource<SelectableItem<Concept>>(
            concepts.map(concept => new SelectableItem<Concept>(concept))
          );
          this.setConcepts.sort = this.selectedSort;
        });
    }
    this.lookupService.getLookupTables().subscribe(tables => this.lookupTables = tables);
  }

  add() {
    this.selectedLookups.forEach((value, key) => {
      console.log(this.setConcepts.data.some(item => item.value.omopConceptId === key))
      if (!this.setConcepts.data.some(item => item.value.omopConceptId === key)) {
        this.setConcepts.data.push(new SelectableItem<Concept>(new Concept(value)));
      }
    });
    this.setConcepts.data = [...this.setConcepts.data];
  }

  selectLookup(event: any) {
    const item = event.value;
    if (event.selected) {
      this.selectedLookups.set(item.omopConceptId, item);
    } else {
      this.selectedLookups.delete(item.omopConceptId);
    }
  }

  getLookupConcepts(event: any) {
    this.selectedLookups.clear();
    this.lookupService.getLookupItems(event.value).subscribe(items => {
     this.lookupConcepts = new MatTableDataSource<SelectableItem<LookupItem>>(
       items.map(item => new SelectableItem<LookupItem>(item))
     );
     this.lookupConcepts.sort = this.lookupSort;
    });
  }

}
