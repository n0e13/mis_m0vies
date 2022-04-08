describe('Login form test', () => {
    it.only('Login scenario', () => {
        cy.visit(Cypress.env('URL_BASE'))
        cy.get('[type="text"]').type("testuser@gmail.com")
        cy.get('[type="password"]').type("Testuser-123")
        cy.get('form').submit()
        
    })
})