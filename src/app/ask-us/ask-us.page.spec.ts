import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AskUsPage } from './ask-us.page';

describe('AskUsPage', () => {
  let component: AskUsPage;
  let fixture: ComponentFixture<AskUsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskUsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AskUsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
