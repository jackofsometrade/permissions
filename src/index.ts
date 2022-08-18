/**
 * Permissions
 */
export class Permissions {

  private set: Set<string>;

  constructor(permissions: string[]){
    this.set = new Set(permissions);
  }

  /**
   * Checks for permission by checking existence of key in keystore
   * TODO: allow this to be a redis backend or other high-efficiency key-value store
   * @param key 
   * @returns true | false
   */
  private exists(key: string): boolean {
    return this.set.has(key);
  }

  /**
   * Create a unique key using configured delimiter
   * @param parts 
   * @returns string
   */
  static createKey(parts: string[]): string {
    return parts.join('|');
  }

  /**
   * Is subject allowed to take this action upon object?
   * @param subject
   * @param action 
   * @param object 
   * @returns true | false
   */
  can(subject: ACO, action: string, object: ACO): boolean {
    for(const subjKey of subject.keys){
      for(const objKey of object.keys){
        if(this.exists([ subjKey, action, objKey ].join('|') )) return true;
      }
    }
    return false;
  }
}

/**
 * Access Control Object (a subject or object of a permission.can() check)
 */
 export class ACO {

  public keys: string[];

  constructor(private uuid: string, private groups: string[] = []){
    this.keys = [this.uuid].concat(this.groups);
  }
}