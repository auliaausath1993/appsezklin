import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Bookservice1Page } from './bookservice1.page';

describe('Bookservice1Page', () => {
  let component: Bookservice1Page;
  let fixture: ComponentFixture<Bookservice1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bookservice1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Bookservice1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
