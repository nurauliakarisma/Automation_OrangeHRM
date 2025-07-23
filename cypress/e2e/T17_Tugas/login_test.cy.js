import LoginPage from '../../support/pageObjects/LoginPage';

describe('Login Test with POM - OrangeHRM', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('TC001 - Login dengan kredensial valid', () => {
    LoginPage.interceptLoginRequest();
    LoginPage.fillUsername('Admin');
    LoginPage.fillPassword('admin123');
    LoginPage.submit();
    LoginPage.assertLoginSuccess();
  });

  it('TC002 - Logout setelah login', () => {
    LoginPage.interceptLoginRequest();
      Cypress.on('uncaught:exception', (err, runnable) => {
          return false; 
        });
    LoginPage.fillUsername('Admin');
    LoginPage.fillPassword('admin123');
    LoginPage.submit();
    LoginPage.assertLoginSuccess();

    LoginPage.logout();
    LoginPage.assertLogoutSuccess();
  });

  it('TC003 - Login dengan password salah', () => {
    LoginPage.interceptLoginRequest();
    LoginPage.fillUsername('Admin');
    LoginPage.fillPassword('salah123');
    LoginPage.submit();
    LoginPage.assertInvalidCredential();
  });

  it('TC004 - Login dengan username salah', () => {
    LoginPage.interceptLoginRequest();
    LoginPage.fillUsername('Salah');
    LoginPage.fillPassword('admin123');
    LoginPage.submit();
    LoginPage.assertInvalidCredential();
  });

  it('TC005 - Login dengan field kosong', () => {
    LoginPage.interceptLoginRequest();
    LoginPage.submit();
    LoginPage.assertRequiredField(':nth-child(2) > .oxd-input-group > .oxd-text');
    LoginPage.assertRequiredField(':nth-child(3) > .oxd-input-group > .oxd-text');
  });

  it('TC006 - Login dengan password kosong', () => {
    LoginPage.interceptLoginRequest();
    LoginPage.fillUsername('Admin');
    LoginPage.submit();
    LoginPage.assertRequiredField(':nth-child(3) > .oxd-input-group > .oxd-text');
  });

  it('TC007 - Login dengan username kosong', () => {
    LoginPage.interceptLoginRequest();
    LoginPage.fillPassword('admin123');
    LoginPage.submit();
    LoginPage.assertRequiredField(':nth-child(2) > .oxd-input-group > .oxd-text');
  });
});
