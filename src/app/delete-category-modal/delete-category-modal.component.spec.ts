import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCategoryModalComponent } from './delete-category-modal.component';

describe('DeleteCategoryModalComponent', () => {
  let component: DeleteCategoryModalComponent;
  let fixture: ComponentFixture<DeleteCategoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCategoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
