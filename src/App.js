import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from './api';
import { InfoAlert, WarningAlert } from './Alert';

// const App = () => {
//    const [allLocations, setAllLocations] = useState([]);
//    const [currentNOE, setCurrentNOE] = useState(32);
//    const [events, setEvents] = useState([]);
//    const [currentCity, setCurrentCity] = useState("See all cities");
//    const [infoAlert, setInfoAlert] = useState("");

// class App extends Component {
//    state = {
//      events: [],
//      locations: [],
//      numberOfEvents: 32
//    }

class App extends Component {
   state = {
      events: [],
      locations: [],
      eventCount: 32,
      selectedCity: null,
      infoAlert: "",
      // setInfoAlert: "",
   };

   setInfoAlert = (text) => {
      this.setState({ infoAlert: text });
   };
   
   componentDidMount() {
      this.mounted = true;
      getEvents().then((events) => {
         if (this.mounted) {
            this.setState({ events, locations: extractLocations(events) });
         }
      } );
   }
   componentWillUnmount(){
      this.mounted = false;
   }

   updateEvents = (location, eventCount) => {
      if (!eventCount) {
         getEvents().then((events) => {
            const locationEvents =
               location === "all"
               ? events
               : events.filter((event) => event.location === location);
            const shownEvents = locationEvents.slice(0, eventCount);
            this.setState({
               events: shownEvents,
               selectedCity: location,
            });
         });
      } else if (eventCount && !location) {
         getEvents().then((events) => {
            const locationEvents = events.filter((event) =>
               this.state.locations.includes(event.location)
            );
            const shownEvents = locationEvents.slice(0, eventCount);
            this.setState({
               events: shownEvents,
               eventCount: eventCount,
               selectedCity: "all", 
            });
         });
      }  else if (location === "all") { 
         getEvents().then((events) => {
            const shownEvents = events.slice(0, eventCount);
            this.setState({
               events: shownEvents,
               eventCount: eventCount,
               selectedCity: "all", 
            });
         });
      } else {
         getEvents().then((events) => {
            const locationEvents =
               this.state.locations === "all"
                  ? events
                  : events.filter(
                     (event) => this.state.selectedCity === event.location
                  );
            const shownEvents = locationEvents.slice(0, eventCount);
            this.setState({
               events: shownEvents,
               eventCount: eventCount,
               selectedCity: location,
            });
         });

         if (!navigator.onLine) {
            this.setState({
              warningText: 'You are currently offline. Events have not been updated since last online.'
            });
          }
          else {
            this.setState({
              warningText: ''
            });
         }
      }
   };
  

   render() {
      const { infoAlert } = this.state;
      return (
         <div className="App">
            <div className="alerts-container">
               {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
            </div>
            <CitySearch 
               locations={this.state.locations} 
               updateEvents={this.updateEvents}
               setInfoAlert={this.setInfoAlert} 
            />
            <EventList
               data-testid="event-list" 
               events={this.state.events} 
            />
            <NumberOfEvents
               data-testid="event-list"
               selectedCity={this.state.selectedCity}
               query={this.state.eventCount}
               updateEvents={this.updateEvents}
            />
            <WarningAlert text={this.state.warningText} />
         </div>
      );
   }
}

export default App;