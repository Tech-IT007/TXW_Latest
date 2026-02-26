import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BranchCoporateTicketDetailsPage } from './branch-coporate-ticket-details.page';

describe('BranchCoporateTicketDetailsPage', () => {
  let component: BranchCoporateTicketDetailsPage;
  let fixture: ComponentFixture<BranchCoporateTicketDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchCoporateTicketDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BranchCoporateTicketDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
