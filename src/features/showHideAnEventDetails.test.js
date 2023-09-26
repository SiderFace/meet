import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventDetails.feature');

//Feature #2 :
defineFeature(feature, test => {
   
   //Scenario #1:
   test('An event element is collapsed by default.', ({  given, when, then }) => {

      let AppComponent;

      given('A list of events was loaded (the app is opened)', () => {
         AppComponent = render(<App />);
      });

      when('The list of events is being displayed', async () => {
         const AppDOM = AppComponent.container.firstChild;
         const EventListDOM = AppDOM.querySelector('#event-list');
   
         await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBe(2);
         });
      });

      then('The details will not be shown without user interaction (event details collapsed)', () => {
         const eventList = AppComponent.container.querySelector('#event-list');
         const eventElements = within(eventList).queryAllByRole('listitem');
         eventElements.forEach((eventElement) => {
            const details = within(eventElement).queryByTestId('details-section');
            expect(details).not.toBeInTheDocument();
         });
      });
   });

   //Scenario #2:
   test('User can expand an event to see more details.', ({ given, when, then  }) => {

      let AppComponent;

      given('A list of events was loaded',  async () => {
         AppComponent = render(<App />);
         const AppDOM = AppComponent.container.firstChild;
         const EventListDOM = AppDOM.querySelector('#event-list');
      
         await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBe(2);
         });
      });

      let expandedEventElement;

      when('The user clicks the "show details" button (the button to expand event details)', async () => {
         const eventList = AppComponent.container.querySelector('#event-list');
         const eventElements = within(eventList).queryAllByRole('listitem');
         const expandButton = within(eventElements[0]).queryByTestId('expand-button');
         userEvent.click(expandButton);
         expandedEventElement = eventElements[0];      
      });

      then('The details of the event will be expanded', () => {
         const details = within(expandedEventElement).queryByTestId('details-section');
         expect(details).toBeDefined();
      });
   });

   //Scenario #3:
   test('User can collapse an event to hide its details.', ({ given, when, then }) => {

      let AppComponent;
      let expandedEventElement;

      given('The user had already selected to show the event expanded details', () => {
         AppComponent = render(<App />);
         const AppDOM = AppComponent.container.firstChild;
         const EventListDOM = AppDOM.querySelector('#event-list');
         
         return waitFor(() => {
         const EventListItems = within(EventListDOM).queryAllByRole('listitem');
         expect(EventListItems.length).toBe(2);
         }).then(() => {
            const eventList = AppComponent.container.querySelector('#event-list');
            const eventElements = within(eventList).queryAllByRole('listitem');
            const expandButton = within(eventElements[0]).queryByTestId('expand-button');
            userEvent.click(expandButton);
            expandedEventElement = eventElements[0];
         });
      });
      when('The user clicks the "hide details" button (the button to collapse the event details)', () => {
         if (!expandedEventElement) {
            throw new Error('Expanded event element is not defined');
         }

         const hideDetailsButton = within(expandedEventElement).queryByTestId('hide-details-button');
         userEvent.click(hideDetailsButton);
      });

      then('The details of the event will return to their default collapsed/hidden state', () => {
         if (!expandedEventElement) {
            throw new Error('Expanded event element is not defined');
         }
   
         const details = within(expandedEventElement).queryByTestId('details-section');
         expect(details).not.toBeInTheDocument();
      });
   });

});