/**
 * @description A Visual Studio Code extension that opens HTML files in a browser of user's choice.
 * @author Igor Dimitrijević <igor.dvlpr@gmail.com>
 * @copyright Igor Dimitrijević, 2018.
 */

import { WorkspaceConfiguration, ConfigurationTarget, workspace } from 'vscode';

export default abstract class Config {
  // configuration keys
  public static readonly PickerLayout: string = 'pickerLayout';

  // configuration values
  public static readonly PickerCompactLayout: string = 'Compact';
  public static readonly PickerFullLayout: string = 'Full';

  // user configuration for Open in Browser
  private static current: WorkspaceConfiguration = workspace.getConfiguration('openInBrowser');

  // reload the configuration
  static refresh(): void {
    this.current = workspace.getConfiguration('openInBrowser');
  }

  // check whether the specified key is present in the configuration
  static has(name: string): boolean {
    return this.current.has(name);
  }

  // get the value of the specified key from the configuration
  static get(name: string): string {
    return this.current.get(name);
  }

  // update the configuration
  static update(name: string, value: string, target: ConfigurationTarget = ConfigurationTarget.Global) {
    // update the configuration
    this.current.update(name, value, target);

    // force-refresh the configuration
    this.refresh();
  }
}