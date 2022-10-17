import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let footer: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    footer = fixture.debugElement.query(
      By.css('.footer')
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has the current year', () => {
    const currentYear = new Date().getFullYear();

    expect(footer.nativeElement.textContent).toContain(currentYear);
  });

  it('should has the environment name', () => {
    const environmentName = "Dev";

    expect(footer.nativeElement.textContent).toContain(environmentName);
  });
});
