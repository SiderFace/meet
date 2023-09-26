import React from "react";
import { mount } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents/> component", () => {
   
   let NumberOfEventsWrapper;
   const updateEvents = jest.fn();

   beforeAll(() => {
      NumberOfEventsWrapper = mount(
         <NumberOfEvents 
            selectedCity="someCity"
            query={32}
            updateEvents={updateEvents}
         />
      );
   });

   test("Default input is 1", () => {
      expect(NumberOfEventsWrapper.state("query")).toBe(1);
   } );

   test("Value changes to 32", () => {
      NumberOfEventsWrapper.find(".numberOfEvents").simulate("change", {
         target: {value: 32 },
      });
      expect(NumberOfEventsWrapper.state("query")).toBe(32);
   } );

} );