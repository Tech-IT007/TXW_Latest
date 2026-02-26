import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuotationApproveAllTicketsPage } from './quotation-approve-all-tickets.page';

describe('QuotationApproveAllTicketsPage', () => {
  let component: QuotationApproveAllTicketsPage;
  let fixture: ComponentFixture<QuotationApproveAllTicketsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationApproveAllTicketsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuotationApproveAllTicketsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
