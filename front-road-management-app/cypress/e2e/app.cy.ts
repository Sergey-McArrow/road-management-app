/// <reference types="cypress" />

describe('Road Management App', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false)
    cy.intercept('/roads', { fixture: 'roads.json' }).as('getRoads')
    cy.intercept('/todos', { fixture: 'todos.json' }).as('getTodos')
    cy.visit('/')
  })

  describe('Navigation and Layout', () => {
    it('should display the main page with navigation', () => {
      cy.get('nav').should('exist')
      cy.get('[data-testid="nav-logo"]').should('exist')
    })

    it('should have working navigation links', () => {
      cy.get('nav').within(() => {
        cy.contains('Karte').should('exist')
        cy.contains('Straßen').should('exist')
        cy.contains('Auswertungen').should('exist')
        cy.contains('Todos').should('exist')
      })
    })
  })

  describe('Map Features', () => {
    it('should load and display the map', () => {
      cy.wait('@getRoads')
      cy.get('[data-testid="map-container"]').should('exist')
      cy.get('.leaflet-container').should('exist')
    })

    it('should show road features on the map', () => {
      cy.wait('@getRoads')
      cy.get('.leaflet-overlay-pane path').should('have.length.at.least', 1)
    })

    it('should show road details in sidebar', () => {
      cy.wait('@getRoads')
      cy.get('[data-testid="statistics-sidebar"]').should('exist')
      cy.get('[data-testid="road-stats"]').should('exist')
    })
  })

  describe('Todo Management', () => {
    beforeEach(() => {
      cy.contains('Todos').click()
      cy.wait('@getTodos')
    })

    it('should display todo list', () => {
      cy.get('[data-testid="todo-list"]').should('exist')
      cy.get('[data-testid="todo-item"]').should('have.length.at.least', 1)
    })
  })
})
