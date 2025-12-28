import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmControlPanelComponent } from './algorithm-control-panel.component';

describe('AlgorithmControlPanelComponent', () => {
  let component: AlgorithmControlPanelComponent;
  let fixture: ComponentFixture<AlgorithmControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgorithmControlPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
