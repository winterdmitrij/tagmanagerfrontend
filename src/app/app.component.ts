import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isInstancesActive: boolean = false;
  isTagGroupActive: boolean = false;

  ngOnInit(): void {

  }

  public onClickHome(): void {
    this.isTagGroupActive = false;
    this.isInstancesActive = false;
    console.log("instance: ", this.isInstancesActive, "; tagGroup: ", this.isTagGroupActive);
    
  }

  public onClickInstances(): void {
    this.isTagGroupActive = false;
    this.isInstancesActive = true;
    console.log("instance: ", this.isInstancesActive, "; tagGroup: ", this.isTagGroupActive);
  }

  public onClickTagGroups(): void {
    this.isInstancesActive = false;
    this.isTagGroupActive = true;
    console.log("instance: ", this.isInstancesActive, "; tagGroup: ", this.isTagGroupActive);
  }
}
