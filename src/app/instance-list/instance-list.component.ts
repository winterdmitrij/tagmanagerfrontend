import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ModelService } from '../shared/model.service';
import { Instance } from '../shared/model';

@Component({
  selector: 'app-instance-list',
  templateUrl: './instance-list.component.html',
  styleUrls: ['./instance-list.component.css']
})
export class InstanceListComponent  implements OnInit{
  
  title = 'Instances List';
  
  public instances: Instance[] = [];
  public editInstance?: Instance;
  public deleteInstance?: Instance;
  
  constructor(private modelService: ModelService){}

  ngOnInit() {
      this.getInstances();
  }

  public getInstances(): void {
    this.modelService.getInstances().subscribe(
      (response: Instance[]) => {
        this.instances = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // Methods vor Modalforms
  // Add
  public onAddInstance(addForm: NgForm): void {
    document?.getElementById('add-instance-form')?.click();
    this.modelService.addInstance(addForm.value).subscribe(
      (response: Instance) => {
        console.log(response);
        this.getInstances();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  // edit
  public onUpdInstance(instance: Instance): void {
    this.modelService.updInstance(instance).subscribe(
      (response: Instance) => {
        console.log(response);
        this.getInstances();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  // delete
  public onDelInstance(site: any): void {
    this.modelService.delInstance(site).subscribe(
      (response: void) => {
        console.log(response);
        this.getInstances();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  // Buttons vor Modalforms
  public onOpenModal(instance: Instance, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editInstance = instance;
      button.setAttribute('data-target', '#updInstanceModal'); // upd
    }
    if (mode === 'delete') {
      this.deleteInstance = instance;
      button.setAttribute('data-target', '#delInstanceModal'); // del
    }
    container?.appendChild(button); // ? - löschen am Ende
    button.click();
  }

  public onOpenModal2(mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addInstanceModal');
    }
    container?.appendChild(button); // ? - löschen am Ende
    button.click();
  }
}