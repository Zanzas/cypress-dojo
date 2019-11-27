
/// <reference types="Cypress" />

const url = 'https://www.pokebip.com/pokedex/6G_liste_des_pokemon.html';

describe('Home Page', () => {
  const NUMBER_OF_POKEMONS = 721;

  // 1.  Use beforeEach and visit url in it
  it('it should provide all pokemons table', () => {
    // Given I visit the home page
    cy.visit(url)

    // Then I should see the title     
    cy.get('h1')
      .should('contain', 'Liste des pokémon')

    // And a list of all 721 pokemons
    cy.get('#g6_liste_pkmn').as('pokemonList')
    cy.get('@pokemonList').find('tr')
      .should('have.length', NUMBER_OF_POKEMONS+1) // +1 for the table header

  })

  it('it should fiter pokemon', () => {
    // Given I visit the home page
    cy.visit(url)

    // When I filter
    cy.get(`input ~ img[alt='Dragon']`).prev().check()
    cy.get(`input ~ img[alt='Spectre']`).prev().check()
    cy.get('.g6_c0 > select').select('Seulement ces types')
    cy.get('[type="button"]').click()

    // Then a list of 1 pokemon Giratina
    cy.get('#g6_liste_pkmn tr')
      .should('have.length', 2) // +1 for the table header
    cy.get('#g6_liste_pkmn tr').should('contain', 'Giratina')

  })

  // 1. Create a Command to simplify check type
  it('it should filter pokemon by type and attack', () => {

  })

  it('it should filter pokemon by type and attack', () => {
    
  })

  it('it should be able to visit detail page of second pokemon', () => {
    // Given I visit the home page
    cy.visit(url)

    // When I click on second pokemon
    cy.get('#g6_liste_pkmn tr').eq(2).find('a')
      .click()

    // Then i redirected to the correct path
    cy.location('pathname').should('include', 'Herbizarre')

  })

  // use go function
  it('it should be able to visit detail page and go back to home', () => {
    
  })

  it('it should be able to search a pokemon pikachu', () => {
    
  })

  it('it should display all attack of pikachu', () => {

  })
  
})
