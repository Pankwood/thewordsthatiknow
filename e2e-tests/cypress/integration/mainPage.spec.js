/// <reference types="Cypress" />

before('Visit web page', function() {
    cy.visit('https://thewordsthatiknow-app-git-stage-pankwood.vercel.app/')
})  

describe('Validade Header', function(){
    it('Validade title, app name and logo', function() {
        cy.contains('The Words That I Know')
        cy.get('#divLogo img').should('be.visible')
    })
})