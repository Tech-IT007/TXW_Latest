import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinencePaymentApprovelPage } from './finence-payment-approvel.page';

describe('FinencePaymentApprovelPage', () => {
  let component: FinencePaymentApprovelPage;
  let fixture: ComponentFixture<FinencePaymentApprovelPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FinencePaymentApprovelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinencePaymentApprovelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
