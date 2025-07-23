import LoginPage from '../../support/pageObjects/LoginPage';

describe('Login Test with fixture and POM', () => {
  beforeEach(function () {
    cy.fixture('login').as('loginData');
    LoginPage.visit();
  });

  it('TC001 - Login dengan kredensial valid', function () {
    const user = this.loginData.validUser;
    LoginPage.login(user.username, user.password);
    LoginPage.assertLoginSuccess();
  });

  it('TC002 - Logout setelah login', function () {
    const user = this.loginData.validUser;
    LoginPage.interceptLoginRequest();
    Cypress.on('uncaught:exception', () => false);
    LoginPage.login(user.username, user.password);
    LoginPage.assertLoginSuccess();
    LoginPage.logout();
    LoginPage.assertLogoutSuccess();
  });

  it('TC003 - Login dengan password salah', function () {
    const user = this.loginData.invalidPassword;
    LoginPage.interceptLoginRequest();
    LoginPage.login(user.username, user.password);
    LoginPage.assertInvalidCredential();
  });

  it('TC004 - Login dengan username salah', function () {
    const user = this.loginData.invalidUsername;
    LoginPage.interceptLoginRequest();
    LoginPage.login(user.username, user.password);
    LoginPage.assertInvalidCredential();
  });

  it('TC005 - Login dengan field kosong', function () {
    const user = this.loginData.emptyBoth;
    LoginPage.interceptLoginRequest();
    LoginPage.login(user.username, user.password);
    LoginPage.assertRequiredField(':nth-child(2) > .oxd-input-group > .oxd-text');
    LoginPage.assertRequiredField(':nth-child(3) > .oxd-input-group > .oxd-text');
  });

  it('TC006 - Login dengan password kosong', function () {
    const user = this.loginData.emptyPassword;
    LoginPage.interceptLoginRequest();
    LoginPage.login(user.username, user.password);
    LoginPage.assertRequiredField(':nth-child(3) > .oxd-input-group > .oxd-text');
  });

  it('TC007 - Login dengan username kosong', function () {
    const user = this.loginData.emptyUsername;
    LoginPage.interceptLoginRequest();
    LoginPage.login(user.username, user.password);
    LoginPage.assertRequiredField(':nth-child(2) > .oxd-input-group > .oxd-text');
  });
});
