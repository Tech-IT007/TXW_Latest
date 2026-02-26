import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechniceanCompleteVisitPage } from './technicean-complete-visit.page';

describe('TechniceanCompleteVisitPage', () => {
  let component: TechniceanCompleteVisitPage;
  let fixture: ComponentFixture<TechniceanCompleteVisitPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TechniceanCompleteVisitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TechniceanCompleteVisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
