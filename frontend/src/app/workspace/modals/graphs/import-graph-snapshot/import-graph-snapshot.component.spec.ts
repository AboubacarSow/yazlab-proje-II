import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportGraphSnapshotComponent } from './import-graph-snapshot.component';

describe('ImportGraphSnapshotComponent', () => {
  let component: ImportGraphSnapshotComponent;
  let fixture: ComponentFixture<ImportGraphSnapshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportGraphSnapshotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportGraphSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
