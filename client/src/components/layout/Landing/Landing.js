import React, { Component } from 'react';
import { Link } from 'react-router-dom';





class Landing extends Component {
  

  render() {
    return (
      <div className="col-md-12 text-center">
        <h1 className="display-3 mb-4">Добро пожаловать</h1>
        <div>
            <Link className="btn btn-lg btn-info mr-2" to="/task-view">
            Список задач
          </Link>
        </div>
      </div>
    );
  }
}





export default Landing;
