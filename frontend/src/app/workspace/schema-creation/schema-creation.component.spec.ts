import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaCreationComponent } from './schema-creation.component';

describe('SchemaCreationComponent', () => {
  let component: SchemaCreationComponent;
  let fixture: ComponentFixture<SchemaCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchemaCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemaCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
