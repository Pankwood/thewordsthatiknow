/// <reference types="Cypress" />

const faker = require('faker')

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

describe('Validade textbox area', function(){
    it('Characteres, word counter', function() {
        const testExample = 'Teste@#1+*'
        cy.get('#text').should('have.attr', 'maxlength', '10000')
        cy.get('#remaning').should('have.text', '10000 / 10000')
        cy.get('#text').type(testExample)
        cy.get('#remaning').should('have.text', '9990 / 10000')
        cy.get('#cmbLanguages').select(2)
        cy.get('#text').should('have.value', testExample)

    })
})

describe('Validade Check it button', function(){
    const testSimpleCharacters = 'Your text here'
    const testSpecialCharacters = '!@#$%^&*'
    const testAllCharacters = 'Stage  test  Stage test @!#'
    it('Textbox area empty', function() {
        cy.get('#text').should('be.empty')
        cy.get('#btnCheckWords').click()
        cy.get('#toast-container > div > div.toast-message').should('have.text', ' Type any word before check it in. ')
    })
    it('Special characters only on textbox area', function() {
        cy.get('#text').type(testSpecialCharacters)
        cy.get('#btnCheckWords').click()
        cy.get('#toast-container > div > div.toast-message').should('have.text', ' Type any word before check it in. ')
    })
    it('Change language after text added on textbox area', function() {
        cy.get('#text').type(testSimpleCharacters)
        cy.get('#btnCheckWords').click()
        cy.get('#divSecondStep').should('be.visible')
        cy.get('#cmbLanguages').select(2)
        cy.get('#text').should('be.empty')
        cy.get('#divSecondStep').should('not.exist')
    })
    it('Change language after text added on textbox area', function() {
        cy.get('#text').type(testAllCharacters)
        cy.get('#btnCheckWords').click()
        cy.get('#divSecondStep').should('be.visible')
        cy.get('#Stage0')
        .should('have.value', 'Stage')
        .should('be.checked')
        cy.get('#test1').should('have.value', 'test')
        .should('not.be.checked')
        cy.get('input[value="Stage"]').should('length', 1)
        cy.get('input[value="test"]').should('length', 1)
        cy.get('input[value=" "]').should('not.exist')
        cy.get('input[value="@!#"]').should('not.exist')
    })
})

describe.only('Validade Save it funcionality', function(){
    const testSavedWord = 'Stage'
    const randomWord = faker.random.alpha(10)
    it('Save it button to be displayed', function() {
        cy.get('#text').type(testSavedWord)
        cy.get('#btnCheckWords').click()
        cy.get('#divSecondStep').should('be.visible')
        cy.get('#btnSave').should('exist')
    })
    
    it('Not able to save a word already saved on DB', function() {
        cy.get('#text').type(testSavedWord)
        cy.get('#btnCheckWords').click()
        cy.get('#Stage0').should('be.checked')
        cy.get('#btnSave').click()
        cy.get('#toast-container > div > div.toast-message').should('have.text', ' Word(s) has/have been already saved. Please choose another word(s). ')
    }) 
    it('Successfully save a new word on DB', function() {
        cy.get('#text').type(randomWord)
        cy.get('#btnCheckWords').click()
        cy.get('input[value='+randomWord)
           .should('not.be.checked')
           .click()
           .should('be.checked')
        cy.get('#btnSave').click()
        cy.get('#toast-container > div > div.toast-message').should('have.text', ' Word(s) saved. ')
    })
    it('Attempt to save a word without choose one', function() {
        cy.get('#text').type(randomWord)
        cy.get('#btnCheckWords').click()
        cy.get('input[value='+randomWord)
           .should('not.be.checked')
        cy.get('#btnSave').click()
        cy.get('#toast-container > div > div.toast-message').should('have.text', ' Word(s) has/have been already saved. Please choose another word(s). ')
    }) 

    it.only('Saving a word in different languages', function() {
        cy.get('#text').type(randomWord)
        cy.get('#btnCheckWords').click()
        cy.get('input[value='+randomWord)
           .should('not.be.checked')
        cy.get('#btnSave').click()
        cy.get('#toast-container > div > div.toast-message').should('have.text', ' Word(s) has/have been already saved. Please choose another word(s). ')
        cy.get('#cmbLanguages').select(2)
        cy.get('#divSecondStep').should('not.exist')
        cy.get('#btnCheckWords').click()
        cy.get('input[value='+randomWord)
        .should('not.be.checked')
        .click()
        .should('be.checked')
        cy.get('#btnSave').click()
        cy.get('#toast-container > div > div.toast-message').should('have.text', ' Word(s) saved. ')
    }) 
})  