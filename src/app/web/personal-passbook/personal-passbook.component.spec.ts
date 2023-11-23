import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPassbookComponent } from './personal-passbook.component';

describe('PersonalPassbookComponent', () => {
  let component: PersonalPassbookComponent;
  let fixture: ComponentFixture<PersonalPassbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalPassbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalPassbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
