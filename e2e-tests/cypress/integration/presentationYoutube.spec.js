/// <reference types="Cypress" />

before('Visit web page', function() {
    cy.visit('https://www.youtube.com/watch?v=iMaqzAkgUIs&t=4s')
})  

describe('Validade Youtube video', function(){
    it('Video is available to be played', function() {
    cy.title().should('eq', 'The Words That I Know Presentation - YouTube')
      })
})