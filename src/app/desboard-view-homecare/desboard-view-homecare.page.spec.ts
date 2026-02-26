import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DesboardViewHomecarePage } from './desboard-view-homecare.page';

describe('DesboardViewHomecarePage', () => {
  let component: DesboardViewHomecarePage;
  let fixture: ComponentFixture<DesboardViewHomecarePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DesboardViewHomecarePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DesboardViewHomecarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
