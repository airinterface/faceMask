import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeelizFaceFilterComponent } from './jeeliz-face-filter.component';

describe('JeelizFaceFilterComponent', () => {
  let component: JeelizFaceFilterComponent;
  let fixture: ComponentFixture<JeelizFaceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JeelizFaceFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JeelizFaceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
