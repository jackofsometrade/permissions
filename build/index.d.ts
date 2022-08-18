/**
 * Permissions
 */
export declare class Permissions {
    private set;
    constructor(permissions: string[]);
    /**
     * Checks for permission by checking existence of key in keystore
     * TODO: allow this to be a redis backend or other high-efficiency key-value store
     * @param key
     * @returns true | false
     */
    private exists;
    /**
     * Create a unique key using configured delimiter
     * @param parts
     * @returns string
     */
    static createKey(parts: string[]): string;
    /**
     * Is subject allowed to take this action upon object?
     * @param subject
     * @param action
     * @param object
     * @returns true | false
     */
    can(subject: ACO, action: string, object: ACO): boolean;
}
/**
 * Access Control Object (a subject or object of a permission.can() check)
 */
export declare class ACO {
    private uuid;
    private groups;
    keys: string[];
    constructor(uuid: string, groups?: string[]);
}
