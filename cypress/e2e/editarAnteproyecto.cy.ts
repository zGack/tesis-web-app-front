describe('template spec', () => {
  it('passes', () => {
    cy.visit('/login')
    cy.get('[data-cy="email-input"]').type('admin@admin.com')
    cy.get('[data-cy="password-input"]').type('123123')
    cy.get('[data-cy="login-button"]').click()
    cy.get('[data-ct="anteproyectos-card"]').click()
    cy.get('[data-cy="search-input"]').type('anteproyecto de prueba 1')
    cy.get('[data-cy="Anteproyecto de prueba 1"]').click()
    cy.get('[data-cy="ver-anteproyecto"]').click()
    cy.get('[data-cy="editar-anteproyecto"]').click()
    cy.get('[data-cy="estado-anteproyecto"]').click()
    cy.get('[data-cy="aprobado"]').click()
    cy.get('[data-cy="titulo-input"]').clear()
    cy.get('[data-cy="titulo-input"]').type('Anteproyecto de prueba 1 nuevo titulo')
    cy.get('[data-cy="add-Autores-btn"]').click()
    cy.get('[data-cy="search-user-input"]').type('Michael Brown')
    cy.get('[data-cy="Michael-result"]').click()
    cy.get('[data-cy="add-user-btn"]').click()
    cy.get('[data-cy="create-anteproyecto-btn"]').click()
  })
})