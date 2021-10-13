import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs/operators';

import { PokeformComponent } from './pokeform.component';

describe('PokeformComponent', () => {
  let component: PokeformComponent;
  let fixture: ComponentFixture<PokeformComponent>;

  let hostElement: HTMLElement;
  let inputDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    hostElement = fixture.nativeElement;
    inputDebugElement = fixture.debugElement.query(By.css('.search'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load html', () => {
    const search = hostElement.querySelector('#search');
    expect(search?.textContent).toBe("Search");
  })

  it('input should be empty', () => {
    const search = hostElement.querySelector('input');
    expect(search?.value).toBe("");
  })

  it('should emmit', () => {
    let key: string = "";
    component.searchKey = "poke";
    fixture.detectChanges();

    component.searchKeyChange.pipe(first()).subscribe((searchKey) => key = searchKey);

    inputDebugElement.triggerEventHandler('input', 'poke');

    expect(key).toBe(component.searchKey);
  })
});
