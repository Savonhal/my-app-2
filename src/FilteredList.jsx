import React, { Component } from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import List from './List.jsx';

class FilteredList extends Component {
    constructor(props) {
        super(props);
        
        // The state is just a list of key/value pair (like a hashmap)
        this.state = {
            search: "",
            type: "all"
        };
    }
    // Sets the state whenever the user types on the search bar 
    onSearch =
        (event) => {
            this.setState({ search: event.target.value.trim().toLowerCase() });
        }
    
    /*
    filterItem = (item) => {
        // Checks if the current search term is contained in this item
        // TODO: Add condition to check item’s type
        return item.name.toLowerCase().search(this.state.search) !== -1;
    }
    */

    filterItem = (item) => {
        // Checks if the current search term is contained in this item
        // TODO: Add condition to check item’s type
        const isNameMatch = item.name.toLowerCase().search(this.state.search) !== -1;
        const isTypeMatch = this.state.type === "all" || item.type === this.state.type;
        return isNameMatch && isTypeMatch;
    }

    /* TODO: Add an event handling method for when an item in dropdown is selected
    Per the DropdownButton documentation, this function should take in an eventKey and event
    */
   // Handles the selection of type from the dropdown menu
   onSelectType = (type) => {
        this.setState({ type });
    }

    render() {
        return (
            <div className="container mt-5" >
                <div style={{backgroundColor:"lightgreen", padding:"10px"}}>
                    <h1 style={{textAlign:"left"}}>Produce Search</h1>
                    <div style={{display:'flex'}}>
                        <div style={{marginRight:"2px"}}><input type="text" placeholder="Search" onChange={this.onSearch} /></div>
                        {/* Dropdown button for selecting produce type */}
                        <DropdownButton id="typeDropdown" title={"Type"} variant="info" size='sm'>
                            <li><Dropdown.Item onClick={() => this.onSelectType("all")}>All</Dropdown.Item></li>
                            <li><Dropdown.Item onClick={() => this.onSelectType("Fruit")}>Fruit</Dropdown.Item></li>
                            <li><Dropdown.Item onClick={() => this.onSelectType("Vegetable")}>Vegetable</Dropdown.Item></li>
                        </DropdownButton>
                    </div>
                </div>
                <br />
                <div style={{textAlign:"left", backgroundColor:"honeydew"}}><List items={this.props.items.filter(this.filterItem)} /></div>
            </div>
        );
    }
}
export default FilteredList;