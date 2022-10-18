import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageDefaultComponent } from './page-default.component';

describe('PageDefaultComponent', () => {
  let component: PageDefaultComponent;
  let fixture: ComponentFixture<PageDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageDefaultComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
