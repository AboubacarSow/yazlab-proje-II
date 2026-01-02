import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmResultComponent } from './algorithm-result.component';

describe('AlgorithmResultComponent', () => {
  let component: AlgorithmResultComponent;
  let fixture: ComponentFixture<AlgorithmResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgorithmResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
