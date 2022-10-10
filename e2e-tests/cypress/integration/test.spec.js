/// <reference types="Cypress" />

describe('Visit web page', function() {
    beforeEach('Visit web page', function() {
        cy.visit('https://thewordsthatiknow-app-git-stage-pankwood.vercel.app/')
    })
    it('Check application`s name', function() {
        cy.title().should('eq', 'The Words That I Know')
    })
  })


