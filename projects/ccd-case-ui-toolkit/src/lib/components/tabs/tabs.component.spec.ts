import { ElementRef, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';

describe('', () => {
  let component: TabsComponent;

  it('should create a new instance', () => {
    component = new TabsComponent({} as ActivatedRoute);
    expect(component).toBeTruthy();
  });

  it('should prefix the tab id with "tab-"', () => {
    component = new TabsComponent({} as ActivatedRoute);
    expect(component.getTabId('0')).toBe('tab-0');
  });

  describe('getNextIndex', () => {
    beforeEach(() => {
      component = new TabsComponent({} as ActivatedRoute);
    });

    it('should move to the next tab on ArrowRight', () => {
      expect(component.getNextIndex('ArrowRight', 0, 3)).toBe(1);
    });

    it('should wrap to the first tab when ArrowRight is pressed on the last tab', () => {
      expect(component.getNextIndex('ArrowRight', 2, 3)).toBe(0);
    });

    it('should move to the previous tab on ArrowLeft', () => {
      expect(component.getNextIndex('ArrowLeft', 1, 3)).toBe(0);
    });

    it('should wrap to the last tab when ArrowLeft is pressed on the first tab', () => {
      expect(component.getNextIndex('ArrowLeft', 0, 3)).toBe(2);
    });

    it('should select the first tab on Home', () => {
      expect(component.getNextIndex('Home', 2, 3)).toBe(0);
    });

    it('should select the last tab on End', () => {
      expect(component.getNextIndex('End', 0, 3)).toBe(2);
    });

    it('should return null for any other key', () => {
      expect(component.getNextIndex('Enter', 0, 3)).toBeNull();
    });
  });

  describe('onKeyDown', () => {
    beforeEach(() => {
      component = new TabsComponent({} as ActivatedRoute);
      component.panels = {
        toArray: () => [{ id: 's' } as TabComponent, { id: 's2' } as TabComponent]
      } as unknown as QueryList<TabComponent>;
      component.tabs = {
        toArray: () => [{ nativeElement: { focus: jasmine.createSpy('focus') } }]
      } as unknown as QueryList<ElementRef>;
    });

    it('should select the next panel when ArrowRight is pressed', () => {
      const panels = component.panels.toArray();
      component.onKeyDown({ key: 'ArrowRight', preventDefault: () => {} } as KeyboardEvent, panels[0]);
      expect(panels[0].selected).toBe(false);
      expect(panels[1].selected).toBe(true);
    });

    it('should not change selection for a key that does not navigate', () => {
      const panels = component.panels.toArray();
      component.onKeyDown({ key: 'Enter', preventDefault: () => {} } as KeyboardEvent, panels[0]);
      expect(panels[0].selected).toBeUndefined();
    });
  });

  describe('show', () => {
    it('should update 1st panel component to selected true', () => {
      const obj = [{ id: '0' } as TabComponent, { id: '1' } as TabComponent] ;
      component = new TabsComponent({} as ActivatedRoute);
      component.panels = {
        toArray: () => obj as unknown as TabComponent[]
      } as unknown as QueryList<TabComponent>;

      component.show('0');

      expect(obj).toEqual([{ id: '0', selected: true } as TabComponent, { id: '1', selected: false } as TabComponent] );
    });

    it('should update 1st panel component to selected true when param is null', () => {
      const obj = [{ id: '0' } as TabComponent, { id: '1' } as TabComponent] ;
      component = new TabsComponent({} as ActivatedRoute);
      component.panels = {
        toArray: () => obj as unknown as TabComponent[]
      } as unknown as QueryList<TabComponent>;

      component.show(null);

      expect(obj).toEqual([{ id: '0', selected: true } as TabComponent, { id: '1', selected: false } as TabComponent] );
    });
  });
});
