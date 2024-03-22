describe('template spec', () => {
  it('passes', () => {
    cy.visit('/login')
    cy.get('[data-cy="email-input"]').type('admin@admin.com')
    cy.get('[data-cy="password-input"]').type('123123')
    cy.get('[data-cy="login-button"]').click()
    cy.get('[data-ct="trabajos-card"]').click()
    cy.get('[data-cy="search-input"]').type('anteproyecto de prueba 1')
    cy.get('[data-cy="Anteproyecto de prueba 1 nuevo titulo"]').click()
    cy.get('[data-cy="ver-trabajo"]').click()
    cy.get('[data-cy="editar-trabajo"]').click()
    cy.get('[data-cy="borrar-trabajo"]').click()
  })
})