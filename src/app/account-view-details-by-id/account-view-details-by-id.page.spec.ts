import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountViewDetailsByIdPage } from './account-view-details-by-id.page';

describe('AccountViewDetailsByIdPage', () => {
  let component: AccountViewDetailsByIdPage;
  let fixture: ComponentFixture<AccountViewDetailsByIdPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountViewDetailsByIdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountViewDetailsByIdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
