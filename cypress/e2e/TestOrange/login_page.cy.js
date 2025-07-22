describe('Fitur Login OrangeHRM', () => {
    beforeEach(() => {
      cy.visit('/auth/login');
    });
  
    it('TC001 - Login dengan kredensial valid', () => {
      cy.get('input[name="username"]').type('Admin');
      cy.get('input[name="password"]').type('admin123');
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
      cy.url().should('include', '/dashboard/index');
      cy.get('.oxd-topbar-header-breadcrumb > h6').should('contain', 'Dashboard');
    });
  
    it('TC002 - Logout setelah login', () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false; 
          });
          
      cy.get('input[name="username"]').type('Admin');
      cy.get('input[name="password"]').type('admin123');
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
      cy.url().should('include', '/dashboard/index');
      cy.get('.oxd-topbar-header-breadcrumb > h6').should('contain', 'Dashboard');
  
      cy.get('.oxd-userdropdown-name').click();
      cy.contains('Logout').click();
      cy.wait(1000);
      cy.url().should('include', '/auth/login');
    });
  
    it('TC003 - Login dengan password salah', () => {
      cy.get('input[name="username"]').type('Admin');
      cy.get('input[name="password"]').type('salah123');
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
      cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
    });
  
    it('TC004 - Login dengan username salah', () => {
      cy.get('input[name="username"]').type('Salah');
      cy.get('input[name="password"]').type('admin123');
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
      cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
    });
  
    it('TC005 - Login dengan field kosong', () => {
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
      cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('contain', 'Required');
      cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('contain', 'Required');
    });
  
    it('TC006 - Login dengan password kosong', () => {
      cy.get('input[name="username"]').type('Admin');
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
      cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('contain', 'Required');
    });
  
    it('TC007 - Login dengan username kosong', () => {
      cy.get('input[name="password"]').type('admin123');
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
      cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('contain', 'Required');
    });
  });
  
