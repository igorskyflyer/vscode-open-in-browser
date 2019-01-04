export default abstract class Utils {
  // get the file extension
  public static getExtension(filename: string) : string {
    const extension: string[] = filename.split('.');
 
    if(extension.length === 0) {
      return '';
    }
 
    return extension[extension.length - 1].toLowerCase();
  }

  // validate the provided URL
  public static isValidUrl(url: string): boolean {
    if(url.length === 0) {
      return false;
    }

    return true;

    const pattern: RegExp = new RegExp(/^$/i);

    return pattern.test(url);
  }
}