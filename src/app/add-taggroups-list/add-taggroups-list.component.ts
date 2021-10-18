import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Instance, TagGroup } from '../shared/model';
import { ModelService } from '../shared/model.service';

@Component({
  selector: 'app-add-taggroups-list',
  templateUrl: './add-taggroups-list.component.html',
  styleUrls: ['./add-taggroups-list.component.css']
})
export class AddTaggroupsListComponent implements OnInit {

  instance?: Instance; 
  tagGroups: TagGroup[] = [];
  selectedTagGroups: TagGroup[] = [];
  selectAll: boolean = false;

  constructor(
    private modelService: ModelService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void { 
    this.getTagGroups();
  }

  public getTagGroups(): TagGroup[] {
    this.modelService.getAllTagGroups().subscribe(
      (response: TagGroup[]) => {
        this.tagGroups = response;
        this.tagGroups.map( tg => tg.selected = false );
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    return this.tagGroups;
  }

//-----Methoden für Auswahl von Tag-Gruppen------------
  // Select All
  public onSelectedAll(): void {
    this.selectAll = !this.selectAll;
    console.log("Select all: ", this.selectAll);
    if ( this.selectAll ) {
      this.tagGroups.map( tg => tg.selected = true );
      this.selectedTagGroups = this.tagGroups;
    } else {
      this.tagGroups.map( tg => tg.selected = false );
      this.selectedTagGroups = [];
    }
    console.log("Es wurde ", this.selectedTagGroups.length, " Elementen ausgewählt: ", this.selectedTagGroups);
  }

  // Select TagGroup
  public onClick(tagGroup: TagGroup): TagGroup[] {
    tagGroup.selected = !tagGroup.selected;

    if ( tagGroup.selected == true) {
      this.onChecked(tagGroup);
    } else {
      this.selectAll = false;
      this.onUnChecked(tagGroup);
    }
    return this.tagGroups;
  }

  public onChecked(tagGroup: TagGroup): void {    
    this.selectedTagGroups.push(tagGroup);
    console.log(tagGroup.tagGroupId, " wurde ausgewählt: ", this.selectedTagGroups);
  }

  public onUnChecked(tagGroup: TagGroup): void {
    this.selectedTagGroups = this.deleteTagGroup(tagGroup);
    console.log("Element: ", tagGroup.tagGroupId, " wurde gelöscht aus Ausgewählten");
    console.log("Es ist: ", this.selectedTagGroups.length," Elementen: ", this.selectedTagGroups);
  }

//-----Actions------------------------------------------------------
  public deleteTagGroup(tagGroup: TagGroup): TagGroup[] {
    let index: number = this.selectedTagGroups.indexOf(tagGroup);
    return this.selectedTagGroups.slice(0, index).concat(this.selectedTagGroups.slice(index + 1));
  }

//-----Submit-------------------------------------------------------
  public onSubmit(): void {
    document?.getElementById('add-taggroups-form')?.click();
    this.modelService.setSelectedTagGroup(this.selectedTagGroups);
    console.log("AddTagGroupsList: ", this.selectedTagGroups);
    this.selectedTagGroups = [];
    this.tagGroups.map( tg => tg.selected = false );
    this.selectAll = false;
  }
}
