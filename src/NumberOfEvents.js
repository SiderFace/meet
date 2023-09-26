import React, { Component } from "react";

class NumberOfEvents extends Component {
   state = {
      query: 1,
   };

   componentDidMount() {
      console.log("zzz")
      this.handleInputChanged(
         {target: { value: 1 }}
      );  
   }

   handleInputChanged = (event) => {
      console.log(event)
      const value = event.target.value;
      // this.setState({
      //    query: value,
      // });
      // this.props.updateEvents(this.props.selectedCity, value);
      this.updateProps(value);
      console.log("aaa")
   };

   updateProps(value){
      this.setState({
         query: value,
      });
      this.props.updateEvents(this.props.selectedCity, value);
   }

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