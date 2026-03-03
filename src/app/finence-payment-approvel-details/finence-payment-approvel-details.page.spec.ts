import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinencePaymentApprovelDetailsPage } from './finence-payment-approvel-details.page';

describe('FinencePaymentApprovelDetailsPage', () => {
  let component: FinencePaymentApprovelDetailsPage;
  let fixture: ComponentFixture<FinencePaymentApprovelDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FinencePaymentApprovelDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinencePaymentApprovelDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
