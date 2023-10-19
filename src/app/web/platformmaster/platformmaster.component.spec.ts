import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformmasterComponent } from './platformmaster.component';

describe('PlatformmasterComponent', () => {
  let component: PlatformmasterComponent;
  let fixture: ComponentFixture<PlatformmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
