import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Concept} from '../../models/concept/concept';
import {ConceptSet} from '../../models/concept/concept-set';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {ConceptService} from '../../services/concept-service';
import {take} from 'rxjs';
import {LookupTable} from '../../models/lookup/lookup-table';
import {LookupService} from '../../services/lookup-service';
import {MatSort} from '@angular/material/sort';
import {LookupItem} from '../../models/lookup/lookup-item';
import {SelectableItem} from '../../models/ui/selectable-item';
import {AlertDialogComponent} from '../../utilities/alert-dialog/alert-dialog.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ConceptSetSortType} from '../../enums/concept-set-sort-type';
import {Constants} from '../../constants/constants';
import {SearchLookupTableRequest} from '../../models/requests/search-lookup-table-request';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-edit-concept-set-dialog',
  templateUrl: './edit-concept-set-dialog.component.html',
  styleUrls: ['./edit-concept-set-dialog.component.scss']
})
export class EditConceptSetDialogComponent implements OnInit, AfterViewInit {

  conceptSortTypes = ConceptSetSortType;

  name: FormControl = new FormControl('', Validators.required);
  description: FormControl = new FormControl('');
  assignedTo: FormControl = new FormControl('');
  id: FormControl = new FormControl('');
  originalId: FormControl = new FormControl('');
  sortType: FormControl = new FormControl('');
  published: FormControl = new FormControl('');

  allConceptsSelected = false;
  setConcepts: MatTableDataSource<SelectableItem<Concept>>;
  setColumns = ['selection', 'id', 'name', 'order'];
  selectedConcepts: Map<string, Concept> = new Map<string, Concept>();

  lookupConcepts: MatTableDataSource<SelectableItem<LookupItem>>;
  lookupColumns = ['selection','value.omopConceptId', 'value.name'];
  selectedLookups: Map<string, LookupItem> = new Map<string, LookupItem>();
  @ViewChild('lookupPaginator') lookupPaginator: MatPaginator;
  lookupLength: number;

  lookupTables: LookupTable[];
  currentLookupTable: LookupTable;
  @ViewChild('selectedSort') selectedSort: MatSort;

  searchQuery: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditConceptSetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConceptSet,
    private conceptService: ConceptService,
    private lookupService: LookupService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setConcepts = new MatTableDataSource<SelectableItem<Concept>>();
    this.lookupConcepts = new MatTableDataSource<SelectableItem<LookupItem>>();
    this.selectedConcepts = new Map<string, Concept>();
    this.selectedLookups = new Map<string, LookupItem>();
    this.lookupService.getLookupTables().subscribe(tables => this.lookupTables = tables);

    this.id.disable();
    this.originalId.disable();
    this.published.disable();

    if (this.data != null) {
      this.conceptService.getConceptSet({id: this.data.id})
        .subscribe(concepts => this.initializeConceptsDataSource(concepts));
      this.id.setValue(this.data.id);
      this.originalId.setValue(this.data.originalId);
      this.name.setValue(this.data.name);
      this.description.setValue(this.data.description);
      this.assignedTo.setValue(this.data.assignedTo);
      this.published.setValue(this.data.published);
      this.sortType.setValue(this.data.sortType);
    }
  }

  ngAfterViewInit() {
    if (this.data === null) {
      this.initializeConceptsDataSource([]);
    }
  }

  initializeConceptsDataSource(concepts: Concept[]) {
    this.setConcepts = new MatTableDataSource<SelectableItem<Concept>>(
      concepts.map(concept => new SelectableItem<Concept>(concept))
    );
    this.setConcepts.sort = this.selectedSort;
    this.setConcepts.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'id': return item.value.omopConceptId;
        case 'name': return item.value.defaultLabel;
        case 'order': return item.value.sortOrder;
        default: return item.value.sortOrder;
      }
    }
  }

  add() {
    if (this.selectedLookups.size == 0) {
      this.dialog.open(AlertDialogComponent, {
        data: 'Please select items to add from the lookup table on the right'
      });
    } else {
      let max = this.setConcepts.data.length;
      this.selectedLookups.forEach((value, key) => {
        if (!this.setConcepts.data.some(item => item.value.omopConceptId === key)) {
          const concept = new Concept(value);
          concept.sortOrder = max;
          this.setConcepts.data.push(new SelectableItem<Concept>(concept));
          max++;
        }
      });
      this.setConcepts.data = [...this.setConcepts.data];
    }
    this.refreshTableSort();
  }

  remove() {
    if (this.selectedConcepts.size == 0) {
      this.dialog.open(AlertDialogComponent, {
        data: 'Please select items to remove from the concept table on the left'
      });
    } else {
      this.selectedConcepts.forEach((value, key) => {
        const index = this.setConcepts.data.findIndex(val => val.value === value);
        this.setConcepts.data.splice(index, 1);
        this.selectedConcepts.delete(key);
      })
    }
    this.setConcepts.data = [...this.setConcepts.data];
    this.allConceptsSelected = false;
    this.assignOrder();
    this.refreshTableSort();
  }

  selectSetConcept(concept: SelectableItem<Concept>) {
    const item = concept.value;
    if (concept.selected) {
      this.selectedConcepts.set(item.omopConceptId, item);
    } else {
      this.selectedConcepts.delete(item.omopConceptId);
    }
  }

  selectAllConcepts(event: any) {
    this.setConcepts.data.forEach(item => {
      item.selected = event.checked;
      this.selectSetConcept(item);
    });
  }

  selectLookup(event: SelectableItem<LookupItem>) {
    const item = event.value;
    if (event.selected) {
      this.selectedLookups.set(item.omopConceptId, item);
    } else {
      this.selectedLookups.delete(item.omopConceptId);
    }
  }

  selectAllLookups(event: any) {
    this.lookupConcepts.data.forEach(item => {
      item.selected = event.checked;
      this.selectLookup(item);
    });
  }

  onLookupPage(event: PageEvent) {
    let req: SearchLookupTableRequest =  {
      table: this.currentLookupTable,
      searchQuery: this.searchQuery,
      itemRequested: this.lookupPaginator.pageSize,
      currentPage: event.pageIndex
    };

    this.lookupPaginator.pageIndex = event.pageIndex;

    this.lookupService.getLookupItems(req).subscribe(items => {
      this.lookupConcepts = new MatTableDataSource<SelectableItem<LookupItem>>(
        items.conceptItems.map(item => new SelectableItem<LookupItem>(item))
      );
      this.lookupLength = items.resultCount;
      this.lookupPaginator.length = items.resultCount;
    });
    this.selectedLookups.clear();
  }

  getLookupConcepts(event: any) {
    this.selectedLookups.clear();
    this.searchQuery = '';
    this.onLookupPage({length: this.lookupPaginator.length, pageSize: this.lookupPaginator.pageSize, pageIndex: 0});
  }

  searchLookups() {
    this.onLookupPage({length: this.lookupPaginator.length, pageSize: this.lookupPaginator.pageSize, pageIndex: this.lookupPaginator.pageIndex});
  }

  assignOrder() {
    this.setConcepts.sortData(this.setConcepts.data, this.setConcepts.sort!)
      .forEach( (concept, index) => {
        concept.value.sortOrder = index;
      });
    this.refreshTableSort();
  }

  onListDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.setConcepts.data, event.previousIndex, event.currentIndex);
    this.setConcepts.data = [...this.setConcepts.data];
  }

  refreshTableSort() {
    this.setConcepts.data = this.setConcepts.sortData(this.setConcepts.data, this.setConcepts.sort!);
  }

  createConceptSet() {
    let req = this.buildConceptSet();

    this.conceptService.createConceptSet(req).subscribe(thing => this.dialogRef.close(thing));
  }

  updateConceptSet() {
    let req = this.buildConceptSet();
    req.createdBy = this.data.createdBy;
    this.conceptService.updateConceptSet(req).subscribe(thing => this.dialogRef.close(thing));
  }

  createNewVersion() {
    let req = this.buildConceptSet();
    this.conceptService.createNewConceptSetVersion(req).subscribe(thing => this.dialogRef.close(thing));
  }

  cloneConceptSet() {
    let req = this.buildConceptSet();
    this.conceptService.cloneConceptSet(req).subscribe(thing => this.dialogRef.close(thing));
  }

  publishConceptSet() {
    let req = this.buildConceptSet();
    req.createdBy = this.data.createdBy;
    req.published = new Date(Date.now());

    this.conceptService.updateConceptSet(req).subscribe(thing => console.log(thing));
  }

  buildConceptSet() : ConceptSet {
    return {
      id: this.id.value,
      originalId: this.originalId.value,
      name: this.name.value,
      lookupTable: '',
      description: this.description.value,
      sortType: this.sortType.value,
      items: this.setConcepts.data.map(set => {
        return {
          ...set.value,
          modifiedBy: Constants.userId,
          createdBy: Constants.userId
        }
      }),
      published: this.published.value,
      assignedTo: this.assignedTo.value,
      modifiedBy: Constants.userId,
      createdBy: Constants.userId
    };
  }
}
