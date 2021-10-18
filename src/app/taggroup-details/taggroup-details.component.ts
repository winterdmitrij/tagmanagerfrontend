import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag, TagGroup } from '../shared/model';
import { ModelService } from '../shared/model.service';

@Component({
  selector: 'app-taggroup-details',
  templateUrl: './taggroup-details.component.html',
  styleUrls: ['./taggroup-details.component.css']
})
export class TaggroupDetailsComponent implements OnInit {

  tagGroup?: TagGroup;
  editTag?: Tag;
  deleteTag?: Tag;

  constructor(
    private modelService: ModelService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    this.getTagGroup(params.get('tagGroupId') || '');
  }

  public getTagGroup(tagGroupId: string): void {
    this.modelService.getTagGroup(tagGroupId).subscribe(
      (response: TagGroup) => {
        this.tagGroup = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //------------------------------------------------------------------------
  // Methods vor Modalforms
  // Add
  public onAddTag(tagGroupId: string, addForm: NgForm): void {
    document?.getElementById('add-tag-form')?.click();
    if ( addForm.value.tagTitle === '' || addForm.value.tagTitle == null ) {
      addForm.value.tagTitle = addForm.value.tagId;
    }
    this.modelService.addTag(tagGroupId, addForm.value).subscribe(
      (response: Tag) => {
        console.log(response);
        this.getTagGroup(tagGroupId);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  // delete
  public onDelTag(tagGroupId: any, tagId: any): void {
    this.modelService.delTag(tagGroupId, tagId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTagGroup(tagGroupId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  // edit
  public onUpdTag(tagGroupId: any, tag: Tag): void {
    this.modelService.updTag(tagGroupId, tag).subscribe(
      (response: Tag) => {
        console.log(response);
        this.getTagGroup(tagGroupId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //------------------------------------------------------------------------
  // Buttons vor Modalforms
  public onOpenModal(tag: Tag, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editTag = tag;
      button.setAttribute('data-target', '#updTagModal'); // upd
    }
    if (mode === 'delete') {
      this.deleteTag = tag;
      button.setAttribute('data-target', '#delTagModal'); // del
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
      button.setAttribute('data-target', '#addTagModal');  // add
    }
    container?.appendChild(button);
    button.click();
  }
}
