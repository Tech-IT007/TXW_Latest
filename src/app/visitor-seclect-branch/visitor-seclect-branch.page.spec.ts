import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitorSeclectBranchPage } from './visitor-seclect-branch.page';

describe('VisitorSeclectBranchPage', () => {
  let component: VisitorSeclectBranchPage;
  let fixture: ComponentFixture<VisitorSeclectBranchPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorSeclectBranchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitorSeclectBranchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
