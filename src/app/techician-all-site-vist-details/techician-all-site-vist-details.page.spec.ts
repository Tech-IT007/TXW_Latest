import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechicianAllSiteVistDetailsPage } from './techician-all-site-vist-details.page';

describe('TechicianAllSiteVistDetailsPage', () => {
  let component: TechicianAllSiteVistDetailsPage;
  let fixture: ComponentFixture<TechicianAllSiteVistDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TechicianAllSiteVistDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TechicianAllSiteVistDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
