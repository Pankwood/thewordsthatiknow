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
        cy.get('h1.Title').should('have.text', 'How many words do you think you know?')
        cy.get('h2.Description').should('have.text',"Let's figure this out right now!")
        
    })
})

describe('Validade Language selection', function(){
    it('Introductory text and Language menu selection', function() {
        cy.get('#divFirstStep > h3').should('have.text','First Step')
        cy.get('#divFirstStep > p').should('have.text','Choose the target language, type or paste your text and click on Check it.')
        cy.get('#cmbLanguages').select('French').should('have.value', 'fr')
        cy.get('#cmbLanguages').select('English').should('have.value', 'en')
        cy.get('#cmbLanguages').select('Portuguese').should('have.value', 'pt')
    })
})



