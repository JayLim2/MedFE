import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedServicesCatalogComponent } from './med-services-catalog.component';

describe('MedServicesCatalogComponent', () => {
  let component: MedServicesCatalogComponent;
  let fixture: ComponentFixture<MedServicesCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedServicesCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedServicesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
