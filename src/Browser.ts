/**
 * @description A Visual Studio Code extension that opens HTML files in a browser of user's choice.
 * @author Igor Dimitrijević <igor.dvlpr@gmail.com>
 * @copyright Igor Dimitrijević, 2018.
 */

// needed for the options argument of the constructor
import IBrowser from "./IBrowser";

export default class Browser {
  // browser name
  name: string = '';
  // browser description, shown as details in the browser picker
  // available only when the LayoutPicker == Full
  detail: string = '';
  // command to launch the browser on Windows
  windowsCommand: string = '';
  // command to launch the browser on Linux
  linuxCommand: string = '';
  // command to launch the browser on MacOS
  macOsCommand: string = '';

  constructor(options: IBrowser) {
    this.name = options.name || '';
    this.detail = options.detail || '';
    this.windowsCommand = options.windowsCommand || '';
    this.linuxCommand = options.linuxCommand || '';
    this.macOsCommand = options.macOsCommand || '';
  }
}