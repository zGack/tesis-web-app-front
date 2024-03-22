describe('template spec', () => {
  it('passes', () => {
    cy.visit('/registro')
    cy.get('[data-cy="name-input"]').type('Wall')
    cy.get('[data-cy="lastname-input"]').type('E')
    cy.get('[data-cy="id-input"]').type('123456')
    cy.get('[data-cy="email-input"]').type('walle@javerianacali.edu.co')
    cy.get('[data-cy="password-input"]').type('123123')
    cy.get('[data-cy="confirm-password-input"]').type('123123')
    cy.get('[data-cy="register-btn"]').click()
  })
})