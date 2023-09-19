Serverless (Lambda) usage :

- Frontend: Written with JavaScript/React; hosted on GitHub Pages.
- Backend (Server Logic): Written with Node/Express as Lambda functions (FaaS); hosted on AWS (requests come from frontend to Lambda function to data).
- Backend (Database): Google Calendar API.



User Stories & Gherkin Scenarios

4.1: Test-Drive Development & Test Scenarios


Feature 2 :   Show/hide an event's details

User Story:   As a user, I want to be able to show or hide the details of an event, so I can see or or remove the details about an event.


⦁	Scenario 1:   An event element is collapsed by default.

⦁	Given:   A list of events was loaded (the app is opened)d.

⦁	When:   The list of events is being displayed.

⦁	Then:   The details will not be shown without user interaction (event details collapsed).


⦁	Scenario 2:  User can expand an event to see more details.

⦁	Given:   A list of events was loaded.

⦁	When:   The user clicks the "show details" button (the button to expand event details).

⦁	Then:   The details of the event will be expanded.


⦁	Scenario 3:  User can collapse an event to hide its details.

⦁	Given:   The user had already selected to show the event expanded details.

⦁	When:   The user clicks the "hide details" button (the button to collapse the event details).

⦁	Then:     The details of the event will return to their default collapsed/hidden state.



Feature 3 :   Specify number of events

User Story:   As a user, I want to be able to determine the number of events that are shown at any given time, so that I can control how much will be displayed on my screen.

⦁	Scenario 1:   When user hasn’t specified a number, 32 is the default number

⦁	Given:   A list of events was loaded.

⦁	When:   The list is dispalyed to the user with default settings.

⦁	Then:     The list will display 32 events unless directed to show more.


⦁	Scenario 2:  User can change the number of events they want to see

⦁	Given:   A list of events was loaded.

⦁	When:   The user specifies how many events they want displayed at one time.

⦁	Then:   A number of events will be displayed equal to the amount the user specified that they want displayed.



Feature 4 :   Use the app offline

User Story:   As a travelling user, I want to be able to use as many features of the app, as possible, during times that I don't have an internet connection.

⦁	Scenario 1:   Show cached data when there’s no internet connection

⦁	Given:   The user had made previous data queries on this app.

⦁	When:   The user requests data from the app while there is no internet connection.

⦁	Then:   The user will get data that was previously queried and is stored in cache.


⦁	Scenario 2:  Show error when user changes the settings (city, time range)

⦁	Given:   There was no internet connection to the user's device.

⦁	When:   The user attempts to change the parameters for data to be displayed.

⦁	Then:   The app will inform the user that this is not possible while the device is without an internet conenction.



Feature 5 :   Data Visualization

User Story:   As an advanced user, I want to be able to be able to see the requested data in different ways for better analysis.
⦁	Scenario 1:   Show a chart with the number of upcoming events in each city

⦁	Given:   An individual event page was loaded.

⦁	When:   The user selects the "upcoming events" option.

⦁	Then:   The app will render a chart displaying upcoming events for that particular city.