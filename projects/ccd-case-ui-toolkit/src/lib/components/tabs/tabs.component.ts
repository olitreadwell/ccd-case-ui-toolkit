import { AfterContentInit, Component, ContentChildren, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabComponent } from './tab.component';

@Component({
  selector: 'cut-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: [
    './tabs.component.scss'
  ],
  standalone: false
})
export class TabsComponent implements AfterContentInit {

  @ViewChildren('tab') public tabs!: QueryList<ElementRef>;

  @ContentChildren(TabComponent)
  public panels: QueryList<TabComponent>;

  private readonly panelIds: string[] = [];

  constructor(private readonly route: ActivatedRoute) {}

  public ngAfterContentInit(): void {
    this.panels.forEach((panel) => this.panelIds.push(panel.id));

    this.show(this.route.snapshot.fragment);
  }

  public show(id: string) {
    const panels: TabComponent[] = this.panels.toArray();

    id = id || panels[0].id;

    /* istanbul ignore else */
    if (0 > this.panelIds.indexOf(id)) {
      id = panels[0].id;
    }

    panels.forEach((panel) => panel.selected = id === panel.id);
  }

  public getTabId(id: string): string {
    return 'tab-' + id;
  }

  public onKeyDown(event: KeyboardEvent, panel: TabComponent): void {
    const panels: TabComponent[] = this.panels.toArray();
    const currentIndex: number = panels.indexOf(panel);
    const nextIndex: number | null = this.getNextIndex(event.key, currentIndex, panels.length);

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    this.show(panels[nextIndex].id);
    setTimeout(() => {
      const tab: ElementRef | undefined = this.tabs.toArray()[nextIndex];
      if (tab) {
        tab.nativeElement.focus();
      }
    }, 0);
  }

  public getNextIndex(key: string, currentIndex: number, count: number): number | null {
    switch (key) {
      case 'ArrowRight':
        return (currentIndex + 1) % count;
      case 'ArrowLeft':
        return (currentIndex - 1 + count) % count;
      case 'Home':
        return 0;
      case 'End':
        return count - 1;
      default:
        return null;
    }
  }
}
