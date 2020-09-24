import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndexmenuPage } from './indexmenu.page';

describe('IndexmenuPage', () => {
  let component: IndexmenuPage;
  let fixture: ComponentFixture<IndexmenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexmenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexmenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
