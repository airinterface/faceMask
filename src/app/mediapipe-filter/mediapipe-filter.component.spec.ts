import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediapipeFilterComponent } from './mediapipe-filter.component';

describe('MediapipeFilterComponent', () => {
  let component: MediapipeFilterComponent;
  let fixture: ComponentFixture<MediapipeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediapipeFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediapipeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
