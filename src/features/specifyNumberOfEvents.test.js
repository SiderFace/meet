import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../mock-data';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

//Feature #3 :
defineFeature(feature, test => {

   //Scenario #1:
   test('When user hasn’t specified a number, 1 is the default number.', ({ given, when,then }) => {

      let AppComponent;

      given('A list of events was loaded', () => {
         AppComponent = render(<App />);
      });

      when('The list is dispalyed to the user with default settings', () => {
      });

      then('The list will display 1 event unless directed to show more', () => {
         const defaultNumber = screen.getByTestId('number-of-events-component').value;
         expect(Number(defaultNumber)).toBe(1);
      });
   });

   //Scenario #2:
   test('User can change the number of events they want to see.', ({ given, when, then }) => {

      let AppComponent;

      given('A list of events was loaded', () => {
         AppComponent = render(<App />);
      });

      when('The user specifies how many events they want displayed at one time', async() => {
         const input = screen.getByTestId('number-of-events-component');
         fireEvent.change(input, { target: { value: '1' } } );
         await waitFor(() => {
            expect(input.value).toBe('1');
         });
      });

      then('A number of events will be displayed equal to the amount the user specified that they want displayed', () => {
         const eventList = screen.getByTestId('event-list');
         const eventItems = within(eventList).queryAllByRole('listitem');
         expect(eventItems.length).toBe(1);
      });
   });

});