import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsCatalogComponent } from './doctors-catalog.component';

describe('DoctorsCatalogComponent', () => {
  let component: DoctorsCatalogComponent;
  let fixture: ComponentFixture<DoctorsCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
