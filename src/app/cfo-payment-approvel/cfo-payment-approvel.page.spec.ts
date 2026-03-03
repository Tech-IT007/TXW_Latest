import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CFOPaymentApprovelPage } from './cfo-payment-approvel.page';

describe('CFOPaymentApprovelPage', () => {
  let component: CFOPaymentApprovelPage;
  let fixture: ComponentFixture<CFOPaymentApprovelPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CFOPaymentApprovelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CFOPaymentApprovelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
