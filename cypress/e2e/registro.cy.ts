describe('template spec', () => {
  it('passes', () => {
    cy.visit('/registro')
    cy.get('[data-cy="name-input"]').type('Nombres evaluador 2')
    cy.get('[data-cy="lastname-input"]').type('Apellidos evaluador 2')
    cy.get('[data-cy="id-input"]').type('123456')
    cy.get('[data-cy="email-input"]').type('evaluador2@mail.com')
    cy.get('[data-cy="password-input"]').type('evaluador2')
    cy.get('[data-cy="confirm-password-input"]').type('evaluador2')
    cy.get('[data-cy="register-btn"]').click()
  })
})