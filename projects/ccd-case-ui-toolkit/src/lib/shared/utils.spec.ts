import { safeJsonParse } from './json-utils';
import { SessionStorageService } from './services';
import { getUserDetails, isInternalUser, isJudiciaryUser, USER_DETAILS } from './utils';
import { UserInfo } from './domain/user/user-info.model';

describe('safeJsonParse', () => {
  it('returns fallback when value is null', () => {
    const result = safeJsonParse(null, { ok: false });
    expect(result).toEqual({ ok: false });
  });

  it('parses valid JSON', () => {
    const result = safeJsonParse('{"ok": true}', { ok: false });
    expect(result).toEqual({ ok: true });
  });

  it('returns fallback when value is invalid JSON', () => {
    const result = safeJsonParse('{not-json', { ok: false });
    expect(result).toEqual({ ok: false });
  });
});

function buildUserInfo(roles: string[]): UserInfo {
  return {
    id: '1',
    forename: 'T',
    surname: 'Testing',
    email: 'testing@mail.com',
    active: true,
    roles
  };
}

describe('getUserDetails / isInternalUser / isJudiciaryUser', () => {
  let sessionStorageService: jasmine.SpyObj<SessionStorageService>;

  beforeEach(() => {
    sessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem', 'setItem', 'removeItem']);
  });

  describe('getUserDetails', () => {
    it('returns the parsed user details when present in session storage', () => {
      const userInfo = buildUserInfo(['caseworker']);
      sessionStorageService.getItem.and.returnValue(JSON.stringify(userInfo));

      const result = getUserDetails(sessionStorageService);

      expect(sessionStorageService.getItem).toHaveBeenCalledWith(USER_DETAILS);
      expect(result).toEqual(userInfo);
    });

    it('returns null when session storage has no user details', () => {
      sessionStorageService.getItem.and.returnValue(null);

      expect(getUserDetails(sessionStorageService)).toBeNull();
    });

    it('returns null when no session storage service is provided', () => {
      expect(getUserDetails(undefined)).toBeNull();
    });
  });

  describe('isInternalUser / isJudiciaryUser', () => {
    const cases: Array<{ description: string; roles: string[]; internal: boolean; judiciary: boolean }> = [
      { description: 'no roles', roles: [], internal: false, judiciary: false },
      { description: 'the pui-case-manager role', roles: ['pui-case-manager'], internal: false, judiciary: false },
      { description: 'a judge-like role, case-insensitively', roles: ['Circuit-Judge'], internal: false, judiciary: true },
      { description: 'other roles only', roles: ['caseworker'], internal: true, judiciary: false }
    ];

    cases.forEach(({ description, roles, internal, judiciary }) => {
      it(`returns internal=${internal}, judiciary=${judiciary} for ${description}`, () => {
        sessionStorageService.getItem.and.returnValue(roles.length ? JSON.stringify(buildUserInfo(roles)) : null);

        expect(isInternalUser(sessionStorageService)).toBe(internal);
        expect(isJudiciaryUser(sessionStorageService)).toBe(judiciary);
      });
    });
  });
});
