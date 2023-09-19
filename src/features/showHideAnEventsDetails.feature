Feature: Show/hide an event's details

   Scenario: An event element is collapsed by default.
      Given A list of events was loaded (the app is opened)
      When The list of events is being displayed
      Then The details will not be shown without user interaction (event details collapsed)

   Scenario: User can expand an event to see more details.
      Given A list of events was loaded
      When The user clicks the "show details" button (the button to expand event details)
      Then The details of the event will be expanded

   Scenario: User can collapse an event to hide its details.
      Given The user had already selected to show the event expanded details
      When The user clicks the "hide details" button (the button to collapse the event details)
      Then The details of the event will return to their default collapsed/hidden state