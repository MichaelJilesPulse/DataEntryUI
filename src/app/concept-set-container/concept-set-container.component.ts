import { Component, OnInit } from '@angular/core';
import {ConceptService} from '../services/concept-service';
import {ConceptSet} from '../models/concept/concept-set';
import {first} from 'rxjs';

@Component({
  selector: 'app-concept-set-container',
  templateUrl: './concept-set-container.component.html',
  styleUrls: ['./concept-set-container.component.scss']
})
export class ConceptSetContainerComponent implements OnInit {

  public conceptSets: ConceptSet[];

  constructor(private conceptService: ConceptService) { }

  ngOnInit(): void {
    this.conceptService.getConceptSetsForPicker()
      .subscribe(resp => this.conceptSets = resp);
  }

}
