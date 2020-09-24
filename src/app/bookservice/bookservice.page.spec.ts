import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookservicePage } from './bookservice.page';

describe('BookservicePage', () => {
  let component: BookservicePage;
  let fixture: ComponentFixture<BookservicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookservicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookservicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
