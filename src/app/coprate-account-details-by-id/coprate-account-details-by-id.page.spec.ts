import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoprateAccountDetailsByIdPage } from './coprate-account-details-by-id.page';

describe('CoprateAccountDetailsByIdPage', () => {
  let component: CoprateAccountDetailsByIdPage;
  let fixture: ComponentFixture<CoprateAccountDetailsByIdPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CoprateAccountDetailsByIdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoprateAccountDetailsByIdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
