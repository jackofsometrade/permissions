"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
test('unmatched permissions return false', () => {
    const userUUID = 'abc123';
    const read = 'read';
    const bookUUID = 'def456';
    const permissions = new index_1.Permissions([]);
    const user = new index_1.ACO(userUUID);
    const book = new index_1.ACO(bookUUID);
    expect(permissions.can(user, read, book)).toBe(false);
});
test('matched object to object permissions return true', () => {
    const userUUID = 'abc123';
    const read = 'read';
    const bookUUID = 'def456';
    const permissions = new index_1.Permissions([
        index_1.Permissions.createKey([userUUID, read, bookUUID]),
    ]);
    const user = new index_1.ACO(userUUID);
    const book = new index_1.ACO(bookUUID);
    expect(permissions.can(user, read, book)).toBe(true);
});
test('matched object to group permissions return true', () => {
    const userUUID = 'abc123';
    const read = 'read';
    const bookUUID = 'def456';
    const bookGroup = 'books';
    const permissions = new index_1.Permissions([
        index_1.Permissions.createKey([userUUID, read, bookGroup]),
    ]);
    const user = new index_1.ACO(userUUID);
    const book = new index_1.ACO(bookUUID, ['books']);
    expect(permissions.can(user, read, book)).toBe(true);
});
test('matched group to object permissions return true', () => {
    const userUUID = 'abc123';
    const bookReadersGroup = 'bookReaders';
    const read = 'read';
    const bookUUID = 'def456';
    const permissions = new index_1.Permissions([
        index_1.Permissions.createKey([bookReadersGroup, read, bookUUID]),
    ]);
    const user = new index_1.ACO(userUUID, [bookReadersGroup]);
    const book = new index_1.ACO(bookUUID);
    expect(permissions.can(user, read, book)).toBe(true);
});
test('matched group to group permissions return true', () => {
    const userUUID = 'abc123';
    const bookReadersGroup = 'bookReaders';
    const read = 'read';
    const bookUUID = 'def456';
    const bookGroup = 'books';
    const permissions = new index_1.Permissions([
        index_1.Permissions.createKey([bookReadersGroup, read, bookGroup]),
    ]);
    const user = new index_1.ACO(userUUID, [bookReadersGroup]);
    const book = new index_1.ACO(bookUUID, [bookGroup]);
    expect(permissions.can(user, read, book)).toBe(true);
});
test('many matched permissions return true', () => {
    const userUUID = 'abc123';
    const bookReadersGroup = 'bookReaders';
    const read = 'read';
    const bookUUID = 'def456';
    const bookGroup = 'books';
    const permissions = new index_1.Permissions([
        index_1.Permissions.createKey([userUUID, read, bookUUID]),
        index_1.Permissions.createKey([userUUID, read, bookGroup]),
        index_1.Permissions.createKey([bookReadersGroup, read, bookUUID]),
        index_1.Permissions.createKey([bookReadersGroup, read, bookGroup]),
    ]);
    const user = new index_1.ACO(userUUID, [bookReadersGroup]);
    const book = new index_1.ACO(bookUUID, [bookGroup]);
    expect(permissions.can(user, read, book)).toBe(true);
});
//# sourceMappingURL=index.spec.js.map