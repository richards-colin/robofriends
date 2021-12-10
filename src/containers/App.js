import React, { useState, useEffect, useRef } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import Modal from '../components/Modal';

function App(){

const modal = useRef(null)  
const [robots, setRobots] = useState([])
const [searchfield, setSearchfield] = useState('')

useEffect(()=>{
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then(users => {setRobots(users)});
}, [])


  const onSearchChange = (event) => {
    setSearchfield(event.target.value)
  }

    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
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

export default App;