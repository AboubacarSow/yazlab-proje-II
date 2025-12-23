import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphCreationComponent } from './graph-creation.component';

describe('GraphCreationComponent', () => {
  let component: GraphCreationComponent;
  let fixture: ComponentFixture<GraphCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
