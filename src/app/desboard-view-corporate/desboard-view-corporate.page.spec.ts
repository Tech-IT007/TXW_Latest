import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DesboardViewCorporatePage } from './desboard-view-corporate.page';

describe('DesboardViewCorporatePage', () => {
  let component: DesboardViewCorporatePage;
  let fixture: ComponentFixture<DesboardViewCorporatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DesboardViewCorporatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DesboardViewCorporatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
