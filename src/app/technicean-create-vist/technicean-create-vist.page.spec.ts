import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechniceanCreateVistPage } from './technicean-create-vist.page';

describe('TechniceanCreateVistPage', () => {
  let component: TechniceanCreateVistPage;
  let fixture: ComponentFixture<TechniceanCreateVistPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TechniceanCreateVistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TechniceanCreateVistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
