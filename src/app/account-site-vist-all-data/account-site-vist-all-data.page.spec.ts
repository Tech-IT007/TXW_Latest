import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountSiteVistAllDataPage } from './account-site-vist-all-data.page';

describe('AccountSiteVistAllDataPage', () => {
  let component: AccountSiteVistAllDataPage;
  let fixture: ComponentFixture<AccountSiteVistAllDataPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSiteVistAllDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSiteVistAllDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
