import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaggroupsListComponent } from './add-taggroups-list.component';

describe('AddTaggroupsListComponent', () => {
  let component: AddTaggroupsListComponent;
  let fixture: ComponentFixture<AddTaggroupsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaggroupsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaggroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
