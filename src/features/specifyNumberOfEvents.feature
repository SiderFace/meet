Feature: Specify number of events

Scenario: When user hasn’t specified a number, 1 is the default number.
   Given A list of events was loaded
   When The list is dispalyed to the user with default settings
   Then The list will display 1 event unless directed to show more

Scenario: User can change the number of events they want to see.
   Given A list of events was loaded
   When The user specifies how many events they want displayed at one time
   Then A number of events will be displayed equal to the amount the user specified that they want displayed