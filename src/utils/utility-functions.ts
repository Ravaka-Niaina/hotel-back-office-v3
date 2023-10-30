export class Utils {
  static extractFieldFromObject<T, K extends keyof T>(objectArray: T[], fieldName: K): Array<T[K]> {
    return objectArray.map((object: any) => object[fieldName]);
  }
}
