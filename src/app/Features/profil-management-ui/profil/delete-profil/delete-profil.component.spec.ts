import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProfilComponent } from './delete-profil.component';

describe('DeleteProfilComponent', () => {
  let component: DeleteProfilComponent;
  let fixture: ComponentFixture<DeleteProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
