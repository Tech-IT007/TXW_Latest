import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountApprovelDetailsByIdPage } from './account-approvel-details-by-id.page';

describe('AccountApprovelDetailsByIdPage', () => {
  let component: AccountApprovelDetailsByIdPage;
  let fixture: ComponentFixture<AccountApprovelDetailsByIdPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountApprovelDetailsByIdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountApprovelDetailsByIdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
