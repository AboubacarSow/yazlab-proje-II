import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceSchemaCreationComponent } from './workspace-schema-creation.component';

describe('WorkspaceSchemaCreationComponent', () => {
  let component: WorkspaceSchemaCreationComponent;
  let fixture: ComponentFixture<WorkspaceSchemaCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceSchemaCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceSchemaCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
