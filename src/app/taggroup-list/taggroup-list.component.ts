import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TagGroup } from '../shared/model';
import { ModelService } from '../shared/model.service';

@Component({
  selector: 'app-taggroup-list',
  templateUrl: './taggroup-list.component.html',
  styleUrls: ['./taggroup-list.component.css']
})
export class TaggroupListComponent implements OnInit {

  title = 'Tag Groups List';

  public tagGroups: TagGroup[] = [];
  public editTagGroup?: TagGroup;
  public deleteTagGroup?: TagGroup;

  constructor(private modelService: ModelService) { }

  ngOnInit(): void {
    this.getTagGroups();
  }

  public getTagGroups(): void {
    this.modelService.getAllTagGroups().subscribe(
      (response: TagGroup[]) => {
        this.tagGroups = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // Methods vor Modalforms
  // Add
  public onAddTagGroup(addForm: NgForm): void {
    document?.getElementById('add-taggroup-form')?.click();
    if ( addForm.value.tagGroupTitle === '' || addForm.value.tagGroupTitle == null ) {
      addForm.value.tagGroupTitle = addForm.value.tagGroupId;
    }
    this.modelService.addTagGroup(addForm.value).subscribe(
      (response: TagGroup) => {
        console.log(response);
        this.getTagGroups();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  // delete
  public onDelTagGroup(tagGroupId: any): void {
    this.modelService.delTagGroup(tagGroupId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTagGroups();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  // edit
  public onUpdTagGroup(tagGroup: TagGroup): void {
    this.modelService.updTagGroup(tagGroup).subscribe(
      (response: TagGroup) => {
        console.log(response);
        this.getTagGroups();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // Buttons vor Modalforms
  public onOpenModal(tagGroup: TagGroup, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editTagGroup = tagGroup;
      button.setAttribute('data-target', '#updTagGroupModal'); // upd
    }
    if (mode === 'delete') {
      this.deleteTagGroup = tagGroup;
      button.setAttribute('data-target', '#delTagGroupModal'); // del
    }
    container?.appendChild(button);
    button.click();
  }

  public onOpenModal2(mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTagGroupModal');  // add
    }
    container?.appendChild(button);
    button.click();
  }
}
