import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SyaratPage } from './syarat.page';

describe('SyaratPage', () => {
  let component: SyaratPage;
  let fixture: ComponentFixture<SyaratPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyaratPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SyaratPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
