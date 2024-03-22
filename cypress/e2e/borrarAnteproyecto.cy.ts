describe('template spec', () => {
  it('passes', () => {
    cy.visit('/login')
    cy.get('[data-cy="email-input"]').type('admin@admin.com')
    cy.get('[data-cy="password-input"]').type('123123')
    cy.get('[data-cy="login-button"]').click()
    cy.get('[data-ct="anteproyectos-card"]').click()
    cy.get('[data-cy="search-input"]').type('anteproyecto de prueba 1')
    cy.get('[data-cy="Anteproyecto de prueba 1 nuevo titulo"]').click()
    cy.get('[data-cy="ver-anteproyecto"]').click()
    cy.get('[data-cy="editar-anteproyecto"]').click()
    cy.get('[data-cy="delete-anteproyecto-btn"]').click()
  })
})