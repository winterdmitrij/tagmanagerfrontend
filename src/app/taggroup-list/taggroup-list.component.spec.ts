import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggroupListComponent } from './taggroup-list.component';

describe('TaggroupListComponent', () => {
  let component: TaggroupListComponent;
  let fixture: ComponentFixture<TaggroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaggroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
