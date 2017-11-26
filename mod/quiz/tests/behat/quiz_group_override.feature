@mod @mod_quiz
Feature: Quiz group override in separate groups mode
  In order to override groups
  As a teacher
  I need to see only groups I'm a member of myself

  Background:
    Given I log in as "admin"
    And I set the following system permissions of "Teacher" role:
      | capability | permission |
      | moodle/site:accessallgroups | Prevent |
    And I log out
    And the following "users" exist:
      | username | firstname | lastname | email                |
      | teacher1 | Terry1    | Teacher1 | teacher1@example.com |
      | student1 | Sam1      | Student1 | student1@example.com |
      | teacher2 | Terry2    | Teacher2 | teacher2@example.com |
      | student2 | Sam2      | Student2 | student2@example.com |
      | teacher3 | Terry3    | Teacher3 | teacher3@example.com |
      | student3 | Sam3      | Student3 | student3@example.com |
    And the following "courses" exist:
      | fullname | shortname | category |
      | Course 1 | C1        | 0        |
    And the following "course enrolments" exist:
      | user     | course | role           |
      | teacher1 | C1     | editingteacher |
      | student1 | C1     | student        |
      | teacher2 | C1     | editingteacher |
      | student2 | C1     | student        |
      | teacher3 | C1     | editingteacher |
      | student3 | C1     | student        |
    And the following "groups" exist:
      | name    | course | idnumber |
      | Group 1 | C1     | G1       |
      | Group 2 | C1     | G2       |
      | Group 3 | C1     | G3       |
    And the following "group members" exist:
      | user | group |
      | student1 | G1 |
      | teacher1 | G1 |
      | teacher1 | G3 |
      | student2 | G2 |
      | teacher2 | G2 |
      | teacher2 | G3 |
      | student3 | G3 |
    And the following "question categories" exist:
      | contextlevel | reference | name           |
      | Course       | C1        | Test questions |
    And the following "questions" exist:
      | questioncategory | qtype     | name | questiontext   |
      | Test questions   | truefalse | TF1  | First question |
    And the following "activities" exist:
      | activity | name           | intro                 | course | idnumber |
      | quiz     | Test quiz name | Test quiz description | C1     | quiz1    |
    And quiz "Test quiz name" contains the following questions:
      | question | page |
      | TF1      | 1    |

  @javascript
  Scenario: Override Group 1 as teacher of Group 1
    When I log in as "teacher1"
    And I am on "Course 1" course homepage
    And I follow "Test quiz name"
    And I navigate to "Edit settings" in current page administration
    And I expand all fieldsets
    And I select "Separate groups" from the "Group mode" singleselect
    And I press "Save and display"
    And I navigate to "Group overrides" in current page administration
    And I press "Add group override"
    Then I should not see "Group 2"