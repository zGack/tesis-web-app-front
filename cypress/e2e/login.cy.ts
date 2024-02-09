describe('template spec', () => {
  it('passes', () => {
    cy.visit('/login')
    cy.get('[data-cy="email-input"]').type('admin@admin.com')
    cy.get('[data-cy="password-input"]').type('122222')
    cy.get('[data-cy="login-button"]').click()
  })
})