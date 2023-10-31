import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicemasterComponent } from './invoicemaster.component';

describe('InvoicemasterComponent', () => {
  let component: InvoicemasterComponent;
  let fixture: ComponentFixture<InvoicemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicemasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
