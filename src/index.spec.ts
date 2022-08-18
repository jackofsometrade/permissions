import { ACO, Permissions } from "./index";

test('unmatched permissions return false', () => {
  const userUUID = 'abc123';
  const read = 'read';
  const bookUUID = 'def456';
  const permissions = new Permissions([]);
  const user = new ACO(userUUID);
  const book = new ACO(bookUUID);
  expect(permissions.can(user, read, book)).toBe(false);
});

test('matched object to object permissions return true', () => {
  const userUUID = 'abc123';
  const read = 'read';
  const bookUUID = 'def456';
  const permissions = new Permissions(
    [
      Permissions.createKey([userUUID, read, bookUUID]),
    ]
  );
  const user = new ACO(userUUID);
  const book = new ACO(bookUUID);
  expect(permissions.can(user, read, book)).toBe(true);
});

test('matched object to group permissions return true', () => {
  const userUUID = 'abc123';
  const read = 'read';
  const bookUUID = 'def456';
  const bookGroup = 'books';
  const permissions = new Permissions(
    [
      Permissions.createKey([userUUID, read, bookGroup]),
    ]
  );
  const user = new ACO(userUUID);
  const book = new ACO(bookUUID, ['books']);
  expect(permissions.can(user, read, book)).toBe(true);
});

test('matched group to object permissions return true', () => {
  const userUUID = 'abc123';
  const bookReadersGroup = 'bookReaders';
  const read = 'read';
  const bookUUID = 'def456';
  const permissions = new Permissions(
    [
      Permissions.createKey([bookReadersGroup, read, bookUUID]),
    ]
  );
  const user = new ACO(userUUID, [bookReadersGroup]);
  const book = new ACO(bookUUID);
  expect(permissions.can(user, read, book)).toBe(true);
});

test('matched group to group permissions return true', () => {
  const userUUID = 'abc123';
  const bookReadersGroup = 'bookReaders';
  const read = 'read';
  const bookUUID = 'def456';
  const bookGroup = 'books'
  const permissions = new Permissions(
    [
      Permissions.createKey([bookReadersGroup, read, bookGroup]),
    ]
  );
  const user = new ACO(userUUID, [bookReadersGroup]);
  const book = new ACO(bookUUID, [bookGroup]);
  expect(permissions.can(user, read, book)).toBe(true);
});

test('many matched permissions return true', () => {
  const userUUID = 'abc123';
  const bookReadersGroup = 'bookReaders';
  const read = 'read';
  const bookUUID = 'def456';
  const bookGroup = 'books'
  const permissions = new Permissions(
    [
      Permissions.createKey([userUUID, read, bookUUID]),
      Permissions.createKey([userUUID, read, bookGroup]),
      Permissions.createKey([bookReadersGroup, read, bookUUID]),
      Permissions.createKey([bookReadersGroup, read, bookGroup]),
    ]
  );
  const user = new ACO(userUUID, [bookReadersGroup]);
  const book = new ACO(bookUUID, [bookGroup]);
  expect(permissions.can(user, read, book)).toBe(true);
});
