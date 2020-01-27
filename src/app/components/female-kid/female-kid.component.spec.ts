import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FemaleKidComponent } from './female-kid.component';

describe('FemaleKidComponent', () => {
  let component: FemaleKidComponent;
  let fixture: ComponentFixture<FemaleKidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FemaleKidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FemaleKidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
