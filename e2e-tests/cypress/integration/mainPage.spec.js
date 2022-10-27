/// <reference types="Cypress" />

before('Visit web page', function() {
    cy.visit('https://thewordsthatiknow-app-git-stage-pankwood.vercel.app/')
})  

describe('Validade Header', function(){
    it('Title, app name and logo', function() {
        cy.contains('The Words That I Know')
        cy.get('#divLogo img').should('be.visible')
    })
})

describe('Validate Tutorial section', function(){
    it('Text, subtitle and video', function() {
        cy.contains('How many words do you think you know?')
        cy.contains("Let's figure this out right now!")
        // falta o teste do video
    })
})

describe('Validade Language selection', function(){
    it('Introductory text and Language menu selection', function() {
        cy.contains('First Step')
        cy.contains('Choose the target language, type or paste your text and click on Check it.')

    })
})