/**
 * @description A Visual Studio Code extension that opens HTML files in a browser of user's choice.
 * @author Igor Dimitrijević <igor.dvlpr@gmail.com>
 * @copyright Igor Dimitrijević, 2018.
 */

export default class InstalledBrowsers {
  chrome: boolean;
  chromium: boolean;
  firefox: boolean;
  ie: boolean;
  opera: boolean;
  safari: boolean;

  public get length(): number {
    const browsers: boolean[] = [
      this.chrome,
      this.chromium,
      this.firefox,
      this.ie,
      this.opera,
      this.safari
    ];

    return browsers.filter(Boolean).length;
  }

  hasAnyBrowser(): boolean {
    return this.length > 0;
  }

  public constructor() {
    this.chrome = false;
    this.chromium = false;
    this.firefox = false;
    this.ie = false;
    this.opera = false;
    this.safari = false;
  }
}