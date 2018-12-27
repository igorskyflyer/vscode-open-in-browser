/**
 * @description A Visual Studio Code extension that opens HTML files in a browser of user's choice.
 * @author Igor Dimitrijević <igor.dvlpr@gmail.com>
 * @copyright Igor Dimitrijević, 2018.
 */

export default interface IBrowser {
  name: string;
  detail: string;
  windowsCommand: string;
  linuxCommand: string;
  macOsCommand: string;
}