import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDataLocallyModalComponent } from './save-data-locally-modal.component';

describe('SaveDataLocallyModalComponent', () => {
  let component: SaveDataLocallyModalComponent;
  let fixture: ComponentFixture<SaveDataLocallyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveDataLocallyModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SaveDataLocallyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
