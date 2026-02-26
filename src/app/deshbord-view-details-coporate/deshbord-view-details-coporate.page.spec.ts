import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeshbordViewDetailsCoporatePage } from './deshbord-view-details-coporate.page';

describe('DeshbordViewDetailsCoporatePage', () => {
  let component: DeshbordViewDetailsCoporatePage;
  let fixture: ComponentFixture<DeshbordViewDetailsCoporatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeshbordViewDetailsCoporatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeshbordViewDetailsCoporatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
