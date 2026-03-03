import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CFOPaymentApprovelDetailsPage } from './cfo-payment-approvel-details.page';

describe('CFOPaymentApprovelDetailsPage', () => {
  let component: CFOPaymentApprovelDetailsPage;
  let fixture: ComponentFixture<CFOPaymentApprovelDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CFOPaymentApprovelDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CFOPaymentApprovelDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
