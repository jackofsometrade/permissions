"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACO = exports.Permissions = void 0;
/**
 * Permissions
 */
class Permissions {
    constructor(permissions) {
        this.set = new Set(permissions);
    }
    /**
     * Checks for permission by checking existence of key in keystore
     * TODO: allow this to be a redis backend or other high-efficiency key-value store
     * @param key
     * @returns true | false
     */
    exists(key) {
        return this.set.has(key);
    }
    /**
     * Create a unique key using configured delimiter
     * @param parts
     * @returns string
     */
    static createKey(parts) {
        return parts.join('|');
    }
    /**
     * Is subject allowed to take this action upon object?
     * @param subject
     * @param action
     * @param object
     * @returns true | false
     */
    can(subject, action, object) {
        for (const subjKey of subject.keys) {
            for (const objKey of object.keys) {
                if (this.exists([subjKey, action, objKey].join('|')))
                    return true;
            }
        }
        return false;
    }
}
exports.Permissions = Permissions;
/**
 * Access Control Object (a subject or object of a permission.can() check)
 */
class ACO {
    constructor(uuid, groups = []) {
        this.uuid = uuid;
        this.groups = groups;
        this.keys = [this.uuid].concat(this.groups);
    }
}
exports.ACO = ACO;
//# sourceMappingURL=index.js.map