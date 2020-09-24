import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Verification1Page } from './verification1.page';

describe('Verification1Page', () => {
  let component: Verification1Page;
  let fixture: ComponentFixture<Verification1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Verification1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Verification1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
