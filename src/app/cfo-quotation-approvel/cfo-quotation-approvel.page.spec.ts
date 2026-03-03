import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CfoQuotationApprovelPage } from './cfo-quotation-approvel.page';

describe('CfoQuotationApprovelPage', () => {
  let component: CfoQuotationApprovelPage;
  let fixture: ComponentFixture<CfoQuotationApprovelPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CfoQuotationApprovelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CfoQuotationApprovelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
