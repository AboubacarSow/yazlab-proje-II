import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportGraphComponent } from './import-graph.component';

describe('ImportGraphComponent', () => {
  let component: ImportGraphComponent;
  let fixture: ComponentFixture<ImportGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
