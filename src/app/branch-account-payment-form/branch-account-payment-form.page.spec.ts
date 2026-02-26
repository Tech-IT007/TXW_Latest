import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BranchAccountPaymentFormPage } from './branch-account-payment-form.page';

describe('BranchAccountPaymentFormPage', () => {
  let component: BranchAccountPaymentFormPage;
  let fixture: ComponentFixture<BranchAccountPaymentFormPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchAccountPaymentFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BranchAccountPaymentFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
