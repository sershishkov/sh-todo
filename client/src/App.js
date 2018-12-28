import React, { Component } from 'react';
import {BrowserRouter  ,Route, Switch   } from 'react-router-dom';
import './App.css';

import Header from './components/layout/Header';
import Landing from './components/layout/Landing/Landing';
import Footer from './components/layout/Footer';
import TaskView from './components/TaskView';
import CreateTask from './components/create-task/CreateTask';
import EditTask from './components/edit-task/EditTask';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div >
            <Header/>
            <Switch>
              <Route path="/" exact component={Landing}/>
              <Route path="/task-view" exact component={TaskView}/>
              <Route path="/task-create" exact component={CreateTask}/>
              <Route path="/task-edit/:id" exact component={EditTask}/>
            </Switch>
            
            <Footer/>
          </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
