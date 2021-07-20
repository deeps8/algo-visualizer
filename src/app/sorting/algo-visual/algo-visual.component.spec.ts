import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoVisualComponent } from './algo-visual.component';

describe('AlgoVisualComponent', () => {
  let component: AlgoVisualComponent;
  let fixture: ComponentFixture<AlgoVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgoVisualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
