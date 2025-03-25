import { Component, model, ModelSignal } from "@angular/core";
import {
  MatListOption,
  MatSelectionList,
  MatSelectionListChange,
} from "@angular/material/list";
import Plugin from "@model/plugin.model";

@Component({
  selector: "app-plugins",
  templateUrl: "./plugins.component.html",
  styleUrls: ["./plugins.component.scss"],
  imports: [MatSelectionList, MatListOption],
})
export default class PluginsComponent {
  plugins: ModelSignal<Plugin[]> = model<Plugin[]>([]);

  pluginSelected(ev: MatSelectionListChange): void {
    const ind: number = this.plugins().findIndex(
      (p: Plugin): boolean => p.name === ev.options[0].value.name
    );
    if (ind !== -1) {
      this.plugins.update((value: Plugin[]): Plugin[] => {
        value[ind].selected = ev.options[0].selected;
        return value;
      });
    }
  }
}
