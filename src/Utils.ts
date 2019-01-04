export default abstract class Utils {
  // get the file extension
  public static getExtension(filename: string) : string {
    const extension: string[] = filename.split('.');
 
    if(extension.length === 0) {
      return '';
    }
 
    return extension[extension.length - 1].toLowerCase();
  }
}