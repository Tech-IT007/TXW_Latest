import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PpmSubmitTicketsPage } from './ppm-submit-tickets.page';

describe('PpmSubmitTicketsPage', () => {
  let component: PpmSubmitTicketsPage;
  let fixture: ComponentFixture<PpmSubmitTicketsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PpmSubmitTicketsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PpmSubmitTicketsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
