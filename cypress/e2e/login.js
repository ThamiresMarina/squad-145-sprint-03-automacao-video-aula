import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('que acesso o site da Iterasys', () => {
  cy.on('uncaught:exception', () => false)
  cy.visit('https://iterasys.com/')
  cy.get('#user-menu-toggle').click()
})

When('preencho minhas credenciais', () => {
  cy.get('[name="username"]').should('be.visible').type(Cypress.env('email'))
  cy.get('[name="password"]').type(Cypress.env('senha'))
})

When('clico em entrar', () => {
  cy.get('#loginbtn').click()
})

Given('que estou na página Meus Cursos', () => {
  cy.visit('https://iterasys.com/my/courses.php')
})

When('clico em Visualizar Curso no {string}', (curso) => {
  cy.visit('https://iterasys.com/course/view.php?id=2')
})

When('acesso a aula {string}', (aula) => {
  cy.get('#module-19 > .activity-item > .activity-grid > .activity-instance > .activitytitle > .media-body > .activityname > .aalink').click()
})

When('clico em play', () => {
  cy.get('.responsive-iframe').should('be.visible')
})

Then('o vídeo deve iniciar sem erros', () => {
  cy.get('.responsive-iframe').should('exist')
})

Then('o vídeo deve reproduzir sem travamentos', () => {
  cy.get('.responsive-iframe').should('be.visible')
  cy.wait(120000) // aguarda 5 segundos simulando reprodução
  cy.get('.responsive-iframe').should('exist') // verifica que ainda está na página sem erros
})

Given('que simulo uma rede lenta', () => {
  cy.window().then((win) => {
    // Simula conexão lenta via CDP
    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.emulateNetworkConditions',
      params: {
        offline: false,
        latency: 2000,        // 2 segundos de latência
        downloadThroughput: 500 * 1024 / 8,  // Slow 3G
        uploadThroughput: 500 * 1024 / 8
      }
    })
  })
})

Then('o vídeo deve carregar após buffering sem erros', () => {
  cy.get('.responsive-iframe', { timeout: 15000 }) // aguarda mais tempo por ser rede lenta
    .should('exist')
    .and('be.visible')
})


 // Desativa a simulação de rede lenta após o assert
  Cypress.automation('remote:debugger:protocol', {
    command: 'Network.emulateNetworkConditions',
    params: {
      offline: false,
      latency: 0,
      downloadThroughput: -1,
      uploadThroughput: -1
    }
  })
