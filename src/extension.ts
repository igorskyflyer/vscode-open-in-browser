/**
 * @description A Visual Studio Code extension that opens HTML files in a browser of user's choice.
 * @author Igor Dimitrijević <igor.dvlpr@gmail.com>
 * @copyright Igor Dimitrijević, 2018.
 */

import * as vscode from 'vscode';
import Config from './Config';
import { StatusBarAlignment, StatusBarItem, ExtensionContext, commands, window, TextEditor, Disposable } from 'vscode';
import * as browsers from './browsers';
import Utils from './Utils';

// status bar item
let status: StatusBarItem;

// creates and displays the status bar item
function setUpStatusBar(context: ExtensionContext): void {
  // create the status bar item aligned to the right
  status = window.createStatusBarItem(StatusBarAlignment.Right, 100);

  // add to the extension's subscriptions
  context.subscriptions.push(status);
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
  const extension: string = Utils.getExtension(filePath);

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

//
function showBrowserPicker(): string {
  // browser selection picker,
  // can be either string[] (compact layout),
  // or QuickPickItem[] (full layout)
  let picker: any;

  let result: string = '';

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
    // when the layout is compact, the type of the "option" argument is "string",
    if(typeof option === 'string') {
      result = option;
    } 
    else {
      // when the layout is full, the type of the "option" argument is "object"
      result = option['label'];
    }

    // if the selected browser is an empty string,
    // or if the user selected "Cancel", exit
    if(result === 'Cancel') {
      result = '';
    }
  });

  return result;
}

// show the UI for browser selection and launch the selected browser
function openFileCommand(): void {
  const selected: string = showBrowserPicker();

  // launch the selected browser
  launchBrowser(selected);
}

function openUrlCommand(): void {
  window.showInputBox({
    placeHolder: 'Enter URL'
  }).then((value: string) => {
    const selected = showBrowserPicker();

    browsers.openInBrowser(value, selected);
  });
}

// extension entry point
export function activate(context: vscode.ExtensionContext) {
  // set up the status bar item,
  // for showing messages
  setUpStatusBar(context);

  let commandOpenFile: Disposable = commands.registerCommand('extension.openFile', openFileCommand);

  let commandOpenUrl: Disposable = commands.registerCommand('extension.openUrl', openUrlCommand);

  context.subscriptions.push(commandOpenFile);
  context.subscriptions.push(commandOpenUrl);
}