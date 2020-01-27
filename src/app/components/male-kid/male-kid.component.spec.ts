import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaleKidComponent } from './male-kid.component';

describe('MaleKidComponent', () => {
  let component: MaleKidComponent;
  let fixture: ComponentFixture<MaleKidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaleKidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaleKidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
