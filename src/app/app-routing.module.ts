import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { InstanceDetailsComponent } from './instance-details/instance-details.component';
import { InstanceListComponent } from './instance-list/instance-list.component';
import { TaggroupDetailsComponent } from './taggroup-details/taggroup-details.component';
import { TaggroupListComponent } from './taggroup-list/taggroup-list.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'instances', component: InstanceListComponent },
  { path: 'instances/:site', component: InstanceDetailsComponent },
  { path: 'taggroups', component: TaggroupListComponent },
  { path: 'taggroups/:tagGroupId', component: TaggroupDetailsComponent }
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
