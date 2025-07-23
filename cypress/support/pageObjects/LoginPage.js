class LoginPage {
  static visit() {
    cy.visit('/auth/login');
  }

  static interceptLoginRequest() {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');
  }

  static fillUsername(username) {
    cy.get('input[name="username"]').should('be.visible').clear().type(username);
  }

  static fillPassword(password) {
    cy.get('input[name="password"]').should('be.visible').clear().type(password);
  }

  static submit() {
    cy.get('button[type="submit"]').should('be.visible').click();
  }

  static login(username, password) {
    if (username) this.fillUsername(username);
    if (password) this.fillPassword(password);
    this.submit();
  }
  

  static assertLoginSuccess() {
    cy.url().should('include', '/dashboard');
    cy.get('.oxd-topbar-header-breadcrumb > h6').should('be.visible').and('contain', 'Dashboard');
  }

  static assertLogoutSuccess() {
    cy.url().should('include', '/auth/login');
  }

  static assertInvalidCredential() {
    cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
  }

  static assertRequiredField(selector) {
    cy.get(selector).should('be.visible').and('contain', 'Required');
  }

  static logout() {
    cy.get('.oxd-userdropdown-name').should('be.visible').click();
    cy.contains('Logout').should('be.visible').click();
  }
}

export default LoginPage;
