import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailorderPage } from './detailorder.page';

describe('DetailorderPage', () => {
  let component: DetailorderPage;
  let fixture: ComponentFixture<DetailorderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailorderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
