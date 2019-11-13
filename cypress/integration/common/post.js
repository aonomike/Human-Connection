import { When, Then } from "cypress-cucumber-preprocessor/steps";

const narratorAvatar =
  "https://s3.amazonaws.com/uifaces/faces/twitter/nerrsoft/128.jpg";

Then("I click on the {string} button", text => {
  cy.get("button")
    .contains(text)
    .click();
});

Then("my comment should be successfully created", () => {
  cy.get(".iziToast-message").contains("Comment Submitted");
});

Then("I should see my comment", () => {
  cy.get("div.comment p")
    .should("contain", "Human Connection rocks")
    .get(".ds-avatar img")
    .should("have.attr", "src")
    .and("contain", narratorAvatar)
    .get("div p.ds-text span")
    .should("contain", "today at");
});

Then("the editor should be cleared", () => {
  cy.get(".ProseMirror p").should("have.class", "is-empty");
});

Then("I should see latest post first", () => {
  cy.get("article.post-card").eq(0).should("contain", "101")
  cy.get("article.post-card").eq(1).should("contain", "102")
})
