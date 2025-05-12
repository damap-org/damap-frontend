import { DragdropDirective } from './dragdrop.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: ` <div appDragdrop>Drag and drop div</div>
    <div>Standard div</div>`,
  standalone: false,
})
class TestComponent {}

describe('DragdropDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let decorated: DebugElement; // the div with the directive
  let bare: DebugElement; // the div without the directive

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [DragdropDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    decorated = fixture.debugElement.query(By.directive(DragdropDirective));

    bare = fixture.debugElement.query(By.css('div:not([appDragdrop])'));
  });

  it('should create an instance', () => {
    const directive = new DragdropDirective();
    expect(directive).toBeTruthy();
  });

  it('should get dragdrop div', () => {
    const item = decorated.injector.get(DragdropDirective);
    expect(item).toBeTruthy();
  });

  it('should get non-dragdrop div', () => {
    const item = bare.injector.get(DragdropDirective, null);
    expect(item).toBe(null);
  });

  it('should have same fileOver value', () => {
    const item = decorated.injector.get(DragdropDirective);
    const bgColor = decorated.nativeElement.fileOver;
    expect(bgColor).toBe(item.fileOver);
  });
});
