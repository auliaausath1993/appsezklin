import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormProfilePage } from './formprofile.page';

describe('ProfilePage', () => {
  let component: FormProfilePage;
  let fixture: ComponentFixture<FormProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
