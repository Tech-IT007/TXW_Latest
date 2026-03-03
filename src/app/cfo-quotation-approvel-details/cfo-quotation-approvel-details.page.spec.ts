import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CfoQuotationApprovelDetailsPage } from './cfo-quotation-approvel-details.page';

describe('CfoQuotationApprovelDetailsPage', () => {
  let component: CfoQuotationApprovelDetailsPage;
  let fixture: ComponentFixture<CfoQuotationApprovelDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CfoQuotationApprovelDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CfoQuotationApprovelDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
