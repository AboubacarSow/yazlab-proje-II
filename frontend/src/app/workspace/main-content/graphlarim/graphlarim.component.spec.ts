import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphlarimComponent } from './graphlarim.component';

describe('GraphlarimComponent', () => {
  let component: GraphlarimComponent;
  let fixture: ComponentFixture<GraphlarimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphlarimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphlarimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
