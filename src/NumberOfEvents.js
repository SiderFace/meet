import React, { Component } from "react";

class NumberOfEvents extends Component {
   state = {
      query: 1,
   };

   handleInputChanged = (event) => {
      const value = event.target.value;
      this.setState({
         query: value,
      });
      this.props.updateEvents(this.props.selectedCity, value);
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
         </div>
      );
   }
}

export default NumberOfEvents;