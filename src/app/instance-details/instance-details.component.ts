import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Instance, TagGroup } from '../shared/model';
import { ModelService } from '../shared/model.service';

@Component({
  selector: 'app-instance-details',
  templateUrl: './instance-details.component.html',
  styleUrls: ['./instance-details.component.css']
})
export class InstanceDetailsComponent implements OnInit {
  instance?: Instance;
  deleteTagGroup?: TagGroup;
  tagGroups?: TagGroup[];
  selectTagGroups?: TagGroup[];

  constructor(
    private modelService: ModelService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    this.getInstance(params.get('site') || '');
  }

  public getInstance(site: string): void {
    this.modelService.getInstance(site).subscribe(
      (response: Instance) => {
        this.instance = response;
        console.log(this.instance);
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

//-----Modalforms-Methoden-----------------------------------------------
  // Delete Tag Group
  public onDelTagGroup(site: any,  tagGroupId: any): void {
    this.modelService.delTagGroupFromInstance(site, tagGroupId).subscribe(
      (response: Instance) => {
        console.log(response);
        this.getInstance(site);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // Add Tag Groups
  public onAddTagGroups(site: any): void {
    document?.getElementById('add-taggroups-form')?.click();
    this.selectTagGroups = this.modelService.getSelectedTagGroup();
    console.log("InstanceDetail: ", this.selectTagGroups);

    this.modelService.addTagGroupsToInstance(site, this.selectTagGroups).subscribe(
      (response: Instance) => {
        console.log(response);
        this.getInstance(site);
        this.modelService.setSelectedTagGroup([]);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

//-----Checkmk-Methoden---------------------------------------
  // From Checkmk
  public onFromCheckmk(site: any): void {
    this.modelService.loadTagGroupsFromCheckmk(site).subscribe(
      (response: Instance) => {
        console.log(response);
        this.getInstance(site);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // To Checkmk
  public onToCheckmk(instance: Instance): void {
    console.log(instance.site);
    
    this.modelService.loadTagGroupsToCheckmk(instance).subscribe(
      (response: Instance) => {
        console.log(response);
        this.getInstance(instance.site);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

//-------------------------------------------------------------------
  // Buttons vor Modalforms
  public onOpenModal(tagGroup: TagGroup, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'delete') {
      this.deleteTagGroup = tagGroup;
      button.setAttribute('data-target', '#delTagGroupModal'); // del
    }
    container?.appendChild(button);
    button.click();
  }

  public onOpenModal2(instance: Instance, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTagGroupsModal'); // add Tag Groups
    }
    if (mode === 'fromCMK') {
      button.setAttribute('data-target', '#fromCheckmkModal');  // from CMK
    }
    if (mode === 'toCMK') {
      button.setAttribute('data-target', '#toCheckmkModal');    // to CMK
    }
    container?.appendChild(button);
    button.click();
  }
}
