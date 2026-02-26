import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeVerfiedOptPage } from './home-verfied-opt.page';

describe('HomeVerfiedOptPage', () => {
  let component: HomeVerfiedOptPage;
  let fixture: ComponentFixture<HomeVerfiedOptPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeVerfiedOptPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeVerfiedOptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
