import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartylistComponent } from './partylist.component';

describe('PartylistComponent', () => {
  let component: PartylistComponent;
  let fixture: ComponentFixture<PartylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
