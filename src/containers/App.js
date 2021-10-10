import React, { useState, useEffect, useRef } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import Modal from '../components/Modal';

function App(){

  // constructor() {
  //   super()
  //   this.state = {
  //     robots: [],
  //     searchfield: ''
  //   }
  // }
const modal = useRef(null)  
const [robots, setRobots] = useState([])
const [searchfield, setSearchfield] = useState('')

// useEffect(() => {
//   alert("this is a web application that is using React.js, Tachyons, React Hooks and an api call");
// }, []);
//actually use the useState hook to create a piece of state that will toggle a modal to display the information for the application.
  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response=> response.json())
  //     .then(users => {this.setState({ robots: users})});
  // }
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