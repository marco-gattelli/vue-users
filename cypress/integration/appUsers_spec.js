/// <reference types="cypress" />

const mockedUsers = [];
for (let i = 0; i < 30; i++) {
  mockedUsers.push({
    id: `foo${i}`,
    name: `bar${i}`,
    email: `baz${i}`,
    phone: `barbar${i}`,
    company: {
      name: `barbaz${i}`,
      catchPhrase: `barfoo${i}`,
    },
  });
}

beforeEach(() => {
  cy.visit("http://localhost:3000");
  cy.intercept("https://graphqlzero.almansi.me/api", {
    data: { users: { data: mockedUsers } },
  });
});

describe("App Users", () => {
  it("should show the first 10 users when type something", function () {
    // Arrange.
    // Act.
    cy.get('[data-testid="filter-input"]').type("hola");

    // Assert.
    cy.get('[data-testid="user-card"]').should("have.length", 10);
  });

  it("should load 10 more users when scroll to the end", function () {
    // Arrange.
    cy.get('[data-testid="filter-input"]').type("hola");

    // Act.
    cy.get('[data-testid="user-card"]').then(() => {
      cy.scrollTo(0, 5000);
    });

    // Assert.
    cy.get('[data-testid="user-card"]').should("have.length", 20);
  });

  it("should show the skeleton when loading", function () {
    // Arrange.
    // Act.
    cy.get('[data-testid="filter-input"]').type("loading skeleton");

    // Assert.
    cy.get('[data-testid="users-skeleton"]').should("be.visible");
  });

  it("should show an error message if the api fails", function () {
    // Arrange.
    cy.intercept("https://graphqlzero.almansi.me/api", {
      forceNetworkError: true,
    });
    // Act.
    cy.get('[data-testid="filter-input"]').type("with error");

    // Assert.
    cy.get('[data-testid="error"]').should("be.visible");
  });

  it("should show an empty message if the api returns 0 results", function () {
    // Arrange.
    cy.intercept("https://graphqlzero.almansi.me/api", {
      data: { users: { data: [] } },
    });

    // Act.
    cy.get('[data-testid="filter-input"]').type("without users");

    // Assert.
    cy.get('[data-testid="no-users"]').should("be.visible");
  });
});
