Feature: Notification for a mention
  As a user
  I want to be able to mark all my notifications as read
  So as to clear all my notifications at once

  Background:
    Given we have a selection of categories
    And we have the following user accounts:
      | name              | slug              | email             | password |
      | Wolle aus Hamburg | wolle-aus-hamburg | wolle@example.org | 1234     |
      | Matt Rider        | matt-rider        | matt@example.org  | 4321     |

  Scenario: Mention another user, re-login as this user and see notifications
    Given I log in with the following credentials:
      | email             | password |
      | wolle@example.org | 1234     |
    And I start to write a new post with the title "Hey Matt" beginning with:
      """
      Big shout to our fellow contributor
      """
    And mention "@matt-rider" in the text
    And I select a category
    And I choose "en" as the language for the post
    And I click on "Save"
    When I log out
    And I log in with the following credentials:
      | email            | password |
      | matt@example.org | 4321     |
    And see 1 unread notifications in the top menu
    And open the notification menu and click on "mark all as read"
    Then there are no notifications in the top menu
