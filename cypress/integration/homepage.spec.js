
/// <reference types="Cypress" />

const url = 'https://www.pokebip.com/pokedex/6G_liste_des_pokemon.html';

describe('Home Page', () => {
  const NUMBER_OF_POKEMONS = 721;
  

  beforeEach(() => {
    // Given I visit the home page
    cy.visit(url)
    cy.get('#g6_liste_pkmn').as('pokemonList')
  })

    // Do a search
    it('it should be able to search a pokemon pikachu', () => {

      cy.get('#req')
        .type('pikachu', { delay: 100 })
        .should('have.value', 'pikachu')
  
      cy.get('.ui-menu-item').should('have.length', 1)
  
      cy.get('.button').click()
  
  
      cy.location('pathname').should('include', 'Pikachu')
  
    })

  // 1.  Use beforeEach and visit url in it
  it('it should provide all pokemons table', () => {


    // Then I should see the title     
    cy.get('h1')
      .should('contain', 'Liste des pokémon')

    // And a list of all 721 pokemons
    cy.get('@pokemonList').find('tr')
      .should('have.length', NUMBER_OF_POKEMONS+1) // +1 for the table header

  })

  it('it should fiter pokemon', () => {
    // When I filter
    cy.getCheckPokemonType('Dragon').check()
    cy.getCheckPokemonType('Spectre').check()
    cy.get('.g6_c0 > select').select('Seulement ces types')
    cy.get('[type="button"]').click()

    // Then a list of 1 pokemon Giratina
    cy.get('#g6_liste_pkmn tr')
      .should('have.length', 2) // +1 for the table header
    cy.get('#g6_liste_pkmn tr').should('contain', 'Giratina')

  })

  // 1. Create a Command to simplify check type
  it('it should filter pokemon by type dragon and attack acid ', () => {

  })

  it('it should filter pokemon by type and attack', () => {
      // When I filter 
      cy.getCheckPokemonType('Dragon').check()
      cy.get('#attq1').select('Acide')
      cy.get('[type="button"]').click()
  
      // Then a list of 1 pokemon Giratina
      cy.get('#g6_liste_pkmn tr')
        .should('have.length', 2) // +1 for the table header
      cy.get('#g6_liste_pkmn tr').should('contain', 'Kravarech')
  })

  it('it should be able to visit detail page of second pokemon', () => {
    // When I click on second pokemon
    cy.get('#g6_liste_pkmn tr')
      .eq(2)
      .find('a')
      .invoke('removeAttr', 'target')
      .click()

    // Then i redirected to the correct path
    cy.location('pathname').should('include', 'Herbizarre')

  })

  // use go function
  it('it should be able to visit detail page and go back to home', () => {
    // When I click on second pokemon
    cy.get('#g6_liste_pkmn tr')
      .eq(2)
      .find('a')
      .invoke('removeAttr', 'target')
      .click()

    // And I go back
    cy.go("back")

    // Then i redirected to the correct path
    cy.location('pathname').should('include', 'liste_des_pokemon')

  })



  // 1. create a command to do the search
  it('it should display all attack of pikachu', () => {

  })
  
})
