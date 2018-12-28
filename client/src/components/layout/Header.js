import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class Header extends Component {  
  
  render() {  

    return (
      <header className="bg-dark text-white  p-4 text-left">
        <Link className="btn btn-lg btn-info mr-2" to="/">
        Главная
      </Link>
      
     
      </header>
    );
  }
}





export default  Header;
