describe('Проверка добавления ингредиентов в конструктор', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Добавляет булку', function() {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=bun-upper]')
      .contains('Булка')
      .should('exist');
    cy.get('[data-cy=bun-lower]')
      .contains('Булка')
      .should('exist');
  });

  it('Добавляет ингредиенты', function() {
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauce-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Начинка')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус')
      .should('exist');
  })
});

describe('Проверка работы модальных окон', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Открывает модальное окно ингредиента', function () {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Булка').click();
    cy.contains('Детали ингредиента').should('exist');

    cy.get('#modals').contains('Булка').should('exist');
  });

  it('Закрывает модальное окно по клику на крестик', function () {
    cy.contains('Булка').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=close-modal-button]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Закрывает модальное окно по клику на оверлей', function () {
    cy.contains('Булка').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=overlay]').click('left', {force: true});
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Проверка создания заказа', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'});
    cy.intercept('POST', 'api/orders', {fixture: 'order.json'}).as(
      'postOrder'
    );
    cy.setCookie('accessTocken', 'test-access-token');
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refresh-token')
    );
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  afterEach(function(){
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Собирает бургер, отправляет и подтверждает заказ, очищает конструктор', function() {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauce-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=post-order]').click();
    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1', '2', '3']
      })
    cy.get('[data-cy=order-number]').contains('123').should('exist');
    cy.get('[data-cy=close-modal-button]').click();
    cy.contains('Детали ингредиента').should('not.exist');
    cy.get('[data-cy=constructor-data]')
      .contains('Булка')
      .should('not.exist');
    cy.get('[data-cy=constructor-data]')
      .contains('Начинка')
      .should('not.exist');
    cy.get('[data-cy=constructor-data]')
      .contains('Соус')
      .should('not.exist');
  });
});
