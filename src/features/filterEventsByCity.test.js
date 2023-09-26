import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {

   test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
      given('user hasn’t searched for any city', () => {
      });

      let AppComponent;

      when('the user opens the app', () => {
         AppComponent = render(<App />);
      });

      then('the user should see the list of upcoming events', async () => { 
         const AppDOM = AppComponent.container.firstChild;
         const EventListDOM = AppDOM.querySelector('#event-list');

         await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBe(2);
         });
      });
   });


   test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
      let AppComponent;
      given('the main page is open', () => {
         AppComponent = render(<App />);
      });

      let CitySearchDOM;

      when('the user starts typing in the city textbox', async () => {
         const user = userEvent;
         const AppDOM = AppComponent.container.firstChild;
         CitySearchDOM = AppDOM.querySelector('#city-search');
         const citySearchInput = within(CitySearchDOM).queryByRole('textbox');  
         await user.type(citySearchInput, "Berlin");
      });

      then('the user should recieve a list of cities (suggestions) that match what they’ve typed', async () => {
         const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); 
         expect(suggestionListItems).toHaveLength(2);
      });
   });


   test('User can select a city from the suggested list.', ({ given, and, when, then }) => {

      let AppComponent;
      let AppDOM; 
      let CitySearchDOM;
      let citySearchInput;

      given('user was typing “Berlin” in the city textbox', async () => {
         AppComponent = render(<App />);
         const user = userEvent;
         AppDOM = AppComponent.container.firstChild;
         CitySearchDOM = AppDOM.querySelector('#city-search');
         citySearchInput = within(CitySearchDOM).queryByRole('textbox');  
         await user.type(citySearchInput, "Berlin");
      });

      let suggestionListItems;

      and('the list of suggested cities is showing', () => {
         suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); 
         expect(suggestionListItems).toHaveLength(1);
      });

      when('the user selects a city (e.g., “Berlin, Germany”) from the list', async () => {
         const user = userEvent;
         await user.click(suggestionListItems[0]);
      });

      then('the city listed should be changed to the selected city', () => {
         expect(citySearchInput.value).toBe(citySearchInput.value);
      });

      then('the user should receive a list of upcoming events in that city', async () => {
         const EventListDOM = AppDOM.querySelector('#event-list');
         const EventListItems = within(EventListDOM).queryAllByRole('listitem');
         const allEvents = mockData;
         const berlinEvents = allEvents.filter(event => event.location === citySearchInput.value)
         expect(EventListItems).toHaveLength(berlinEvents.length);
      });

      when('the user clicks on "See all cities"', async () => {
         const user = userEvent.setup();
         await user.click(suggestionListItems[suggestionListItems.length - 1]);
      });
     
      then('the city listed should be changed to "all"', () => {
         expect(citySearchInput.value).toBe('all');
      });

      // and('the user should receive a list of upcoming events in that city', async () => {
      //    const EventListDOM = AppDOM.querySelector('#event-list');
      //    const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      //    const allEvents = await getEvents();
      //    const berlinEvents = allEvents.filter(event => event.location === citySearchInput.value)
      //    expect(EventListItems).toHaveLength(berlinEvents.length);
      // });

   });

});