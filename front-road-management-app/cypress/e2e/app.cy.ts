/// <reference types="cypress" />

describe('Road Management App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the main page', () => {
    cy.get('div').should('exist')
  })

  it('should load roads data', () => {
    cy.intercept('/roads', { fixture: 'roads.json' }).as('getRoads')
    cy.wait('@getRoads')
  })

  it('should load todos data', () => {
    cy.intercept('/todos', { fixture: 'todos.json' }).as('getTodos')
    cy.wait('@getTodos')
  })
})
