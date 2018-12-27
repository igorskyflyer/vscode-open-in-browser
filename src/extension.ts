/**
 * @description A Visual Studio Code extension that opens HTML files in a browser of user's choice.
 * @author Igor Dimitrijević <igor.dvlpr@gmail.com>
 * @copyright Igor Dimitrijević, 2018.
 */

import * as vscode from 'vscode';
import Config from './Config';
import { StatusBarAlignment, StatusBarItem, ExtensionContext, commands, window, TextEditor, Disposable } from 'vscode';
import * as browsers from './browsers';

// status bar item
let status: StatusBarItem;

// creates and displays the status bar item
function setUpStatusBar(context: ExtensionContext): void {
  // create the status bar item aligned to the right
  status = window.createStatusBarItem(StatusBarAlignment.Right, 100);

  // add to the extension's subscriptions
  context.subscriptions.push(status);
}

// get the file extension
function getExtension(filename: string) : string {
  const extension: string[] = filename.split('.');
 
  if(extension.length === 0) {
    return '';
  }
 
  return extension[extension.length - 1].toLowerCase();
}

// launches the file in the selected browser
function launchBrowser(browserName: string): void {
  // get the active editor
  const editor: TextEditor = window.activeTextEditor;

  // if no editor is active, exit
  if(!editor) {
    return;
  }

  // get the filepath of the active file
  const filePath: string = editor.document.uri.fsPath;

  // if the filepath is an empty string, exit
  if(filePath.length === 0) {
    window.showInformationMessage('No active file.');
    return;
  }

  // get the extension of the active file
  const extension: string = getExtension(filePath);

  // check if the file/extension is a valid HTML file extension,
  // if not, exit
  if(extension !== 'html' && extension !== 'xhtml' && extension !== 'htm') {
    window.showInformationMessage('No active HTML file.');
    return;
  }

  // set the message that will be shown in the status bar
  status.text = 'Opening...';

  // show the message in the status bar
  status.show();

  // open the file in the selected browser
  browsers.openInBrowser(filePath, browserName);

  // hide the message in the status bar after 2s
  const timer = setTimeout(() => {
    status.hide();
    clearTimeout(timer);    
  }, 2000);
}

// show the UI for browser selection and launch the selected browser
function openCommand(): void {
  // browser selection picker,
  // can be either string[] (compact layout),
  // or QuickPickItem[] (full layout)
  let picker: any;

  // force-refresh the config file to get the latest user preferences
  Config.refresh();
  
  // check the config for the layout of the picker
  if(Config.get(Config.PickerLayout) === Config.PickerCompactLayout) {
    picker = browsers.getCompactPicker();
  }
  else {
    picker = browsers.getFullPicker();
  }

  // show the browser selection picker
  window.showQuickPick(picker).then((option) => {
    let selected: string = '';

    // when the layout is compact, the type of the "option" argument is "string",
    if(typeof option === 'string') {
      selected = option;
    } 
    else {
      // when the layout is full, the type of the "option" argument is "object"
      selected = option['label'];
    }

    // if the selected browser is an empty string,
    // or if the user selected "Cancel", exit
    if(selected === '' || selected === 'Cancel') {
      return;
    }

    // launch the selected browser
    launchBrowser(selected);
  });
}

// extension entry point
export function activate(context: vscode.ExtensionContext) {
  // set up the status bar item,
  // for showing messages
  setUpStatusBar(context);

  let commandOpen: Disposable = commands.registerCommand('extension.open', openCommand);

  context.subscriptions.push(commandOpen);
}