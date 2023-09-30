import React, { Component } from "react";
import { ErrorAlert } from "./Alert";


class NumberOfEvents extends Component {
   state = {
      query: 1,
   };

   handleInputChanged = (event) => {
      const value = event.target.value;
      let errorText = "";
   
      if (value < 1 || value > 32) {
         errorText = "Only positive numbers between 1 and 32 are allowed";
      }
   
      this.setState({
         query: value,
         errorText: errorText,
      });
   
      if (!errorText) {
         this.props.updateEvents(this.props.selectedCity, value);
      }
   };

   render() {
      return (
         <div>
            <input
               type='number'
               className='numberOfEvents'
               data-testid='number-of-events-component'
               min={1}
               max={32}
               value={this.state.query}
               onChange={this.handleInputChanged}
            />
            {this.state.errorText && <ErrorAlert className='errorMessage' text={this.state.errorText} />}
         </div>
      );
   }
}

export default NumberOfEvents;