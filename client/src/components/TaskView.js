import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class TaskView extends Component {
state={
  tasksList:[]
}



  componentWillMount(){
    this.getAllTasks();
  }
  componentWillReceiveProps(){
    this.getAllTasks();
  }

  getAllTasks = () =>{
    axios.get('/api/task')
      .then(res => {
        this.setState({
          tasksList:res.data
        })
      }).catch(err =>console.log(err));
  }
  showListAll = (listToDo)=>{
      return(
        <div className="list-todo">
        {listToDo.length < 1?<h1 className='text-center'>У Вас еще нет задач </h1>:null}
        {listToDo ? (
          listToDo.map((item, i)=>(
            <div 
            key={item._id} 
            className=" col-12 m-auto item-todo text-center">
              <div className="item_id">{item._id}</div>
              <div className="item_text">{item.text}</div>
              <div className="item_status">{item.status}</div>
              <div className="item_date">{ moment(item.date).format('DD MM YYYY')  }</div>

              <div className="button-group">
             <Link to={`/task-edit/${item._id}`} className="link-edit">
             <i class="fa fa-pencil" aria-hidden="true"></i>
              </Link>
             <button
                onClick={this.onDeleteClick.bind(this, item._id)}
                className="btn-del"
              >
              <i class="fa fa-trash" aria-hidden="true"></i>
              </button>

             </div> 
            </div>
          ))
        ): null}
        </div>
      )
  }

  onDeleteClick(id) {
   axios.delete(`/api/task/${id}`)
    .then(res =>{
      console.log(res);
      this.getAllTasks();
    })
  }

  render() {

    return (
      <div className="container">
        <div >
        <Link to="/task-create" className="btn btn-lg btn-info">
          Создать задачу
        </Link>
        <h1 className="text-center">Список ваших задач</h1>
        {this.showListAll(this.state.tasksList)}
        </div>
        
      </div>
    )
  }
}
