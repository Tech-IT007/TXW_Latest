import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BranchAccountPaymentDetailsPage } from './branch-account-payment-details.page';

describe('BranchAccountPaymentDetailsPage', () => {
  let component: BranchAccountPaymentDetailsPage;
  let fixture: ComponentFixture<BranchAccountPaymentDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchAccountPaymentDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BranchAccountPaymentDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
