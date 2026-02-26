import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechicianAllSiteVistDataPage } from './techician-all-site-vist-data.page';

describe('TechicianAllSiteVistDataPage', () => {
  let component: TechicianAllSiteVistDataPage;
  let fixture: ComponentFixture<TechicianAllSiteVistDataPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TechicianAllSiteVistDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TechicianAllSiteVistDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
