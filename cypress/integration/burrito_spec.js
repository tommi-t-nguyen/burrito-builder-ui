describe('Burrito Builder', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', { fixture: 'test-data.json' })
      .visit('http://localhost:3000')
  })

  it('should be able to visit the url', () => {
    cy.url()
    .should('eq', 'http://localhost:3000/');
  });

  it('should be able to see a title', () => {
   cy.get('h1')
   .contains('Burrito Builder')
   .should('be.visible');
  });

  it('should see existing order', () => {
    cy.url()
      .get('.order')
      .should('have.length', 1)
  })

  it('should see a input with buttons', () => {
    cy.get('form')
      .should('be.visible')
      .get('input[name="name"]')
      .should('be.empty')
      .get('button')
      .should('have.length',13)
  })
})

describe('POST requests', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', { fixture: 'test-data.json' })
      .visit('http://localhost:3000')
    cy.intercept({
        method: 'POST',
        url: 'http://localhost:3001/api/v1/orders'},
      {
        statusCode: 201,
        body: {
          "id": 2,
          "name": "Tom",
          "ingredients": ["carnitas","jalapenos"]
        }
      })

  })

  it('should display the new order when form is submitted', () => {
    cy.get('input[name="name"]')
      .type('Tom')
      .get('button[name="carnitas"]')
      .click()
      .get('button[name="jalapenos"]')
      .click()
      .get('button[name="submit"]')
      .click()
      .get('.order')
      .should('have.length', 2)
  })
})
