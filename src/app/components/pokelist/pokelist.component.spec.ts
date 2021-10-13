import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';

import { PokelistComponent } from './pokelist.component';

describe('PokelistComponent', () => {
  let component: PokelistComponent;
  let fixture: ComponentFixture<PokelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokelistComponent ],
      imports: [
        RouterTestingModule.withRoutes(routes)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
