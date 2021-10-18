import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ModelService } from './shared/model.service';
import { HomeComponent } from './home/home.component';
import { InstanceDetailsComponent } from './instance-details/instance-details.component';
import { InstanceListComponent } from './instance-list/instance-list.component';
import { TaggroupListComponent } from './taggroup-list/taggroup-list.component';
import { TaggroupDetailsComponent } from './taggroup-details/taggroup-details.component';
import { AddTaggroupsListComponent } from './add-taggroups-list/add-taggroups-list.component';


@NgModule({
  declarations: [
    AppComponent,
    InstanceListComponent,
    HomeComponent,
    InstanceDetailsComponent,
    TaggroupListComponent,
    TaggroupDetailsComponent,
    AddTaggroupsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ModelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
