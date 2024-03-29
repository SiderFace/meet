import React, { Component } from 'react';
import { InfoAlert } from "./Alert";

class CitySearch extends Component {
   constructor() {
      super();
      this.state = {
         query: "",
         suggestions: [],
         showSuggestions: undefined,
         infoText: "",
         // setInfoAlert: "",
      };
   }

   handleInputChanged = (event) => {
      const value = event.target.value;
      const suggestions = this.props.locations.filter((location) => {
        return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
      });
    
      if (suggestions.length === 0) {
        this.setState({
          query: value,
         //  infoText: 'We cannot find the city you are looking for. Please try another city',
        });
        this.props.setInfoAlert("We cannot find the city you are looking for. Please try another city"); 
      } else {
        this.setState({
          query: value,
          suggestions,
         //  infoText: "",
        });
        this.props.setInfoAlert(""); 
      }
    }

   handleItemClicked = (suggestion) => {
      if (suggestion === "all") {
        this.setState({
          query: "all",
          showSuggestions: false,
        });
        this.props.updateEvents("all");
      } else {
        this.setState({
          query: suggestion,
          showSuggestions: false,
        });
        this.props.updateEvents(suggestion);
      }
    };

   render() {
      return (
         <div className="CitySearch" id="city-search">
            <input
               type="text"
               className="city"
               value={this.state.query}
               onChange={this.handleInputChanged}
               onFocus={() => {this.setState({ showSuggestions: true }) } }
            />

            <ul className="suggestions" style={this.state.showSuggestions ? {}: { display: 'none' }}>
               {this.state.suggestions.map((suggestion) => (
                  <li key={suggestion}
                     onClick={() => this.handleItemClicked(suggestion) }
                  >
                     {suggestion}
                  </li>
               ) ) }

               <li onClick={() => this.handleItemClicked("all") }>
                  <b>See all cities</b>
               </li>
            </ul>
         </div>
      );
   }
}

export default CitySearch;