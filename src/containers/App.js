import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import Modal from '../components/Modal';

import { setSearchField } from '../actions'

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value ))
  }
}

function App(){

const modal = useRef(null)  
const [robots, setRobots] = useState([])
const [searchField, setSearchField] = useState('')
// const { searchField, onSearchChange } = this.props;


useEffect(()=>{
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then(users => {setRobots(users)});
}, [])

// this was coming down as props but because of redux we don't have to declare it
  const onSearchChange = (event) => {
    setSearchField(event.target.value)
  }

    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return !robots.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
        <Modal ref={modal}>
        <h1>Hello World</h1>
        <h2>This web application is made to display using React.js to filter through
          an array that will display various robots.</h2>
        <button onClick={() => modal.current.close()}>Close</button>
        </Modal>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
  }

export default connect(mapStateToProps, mapDispatchToProps)(App);//