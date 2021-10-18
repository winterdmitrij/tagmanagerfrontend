import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggroupDetailsComponent } from './taggroup-details.component';

describe('TaggroupDetailsComponent', () => {
  let component: TaggroupDetailsComponent;
  let fixture: ComponentFixture<TaggroupDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaggroupDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
