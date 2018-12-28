import React, { Component } from 'react';
import axios from 'axios';

import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      text:'',
      status:'',
      id:'',      
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){

    this.setState({
      id : this.props.match.params.id
    });
    axios.get(`/api/task/${this.props.match.params.id}`)
      .then(res=>{
        console.log(res);
        this.setState({
          text:res.data.text,
          status:res.data.status,
        })
      })

     
    
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    } 
     
  }

  onSubmit(e) {
    e.preventDefault();
    const newTask = {      
      text:this.state.text,
      status:this.state.status      
    };

    axios.put(`/api/task/${this.state.id}`, newTask)
    .then(res => this.props.history.push('/task-view'))
    .catch(err =>{
      console.log(err);
      this.setState({errors:err.response.data})
    }
      
    );
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render () {
    const { errors } = this.state;
    const options = [
      { label: '* Определите статус задачи', value: 0 },
      { label: 'Старт задачи', value: 'Старт задачи' },
      { label: 'Задача выполнена на 25%', value: 'Задача выполнена на 25%' },
      { label: 'Задача выполнена на 50%', value: 'Задача выполнена на 50%' },
      { label: 'Задача выполнена на 75%', value: 'Задача выполнена на 75%' },
      { label: 'Задача выполнена на 100% и тестируется', value: 'Задача выполнена на 100% и тестируется' },
      { label: 'Задача выполнена ', value: 'Задача выполнена' },
      
    ];
    return (
      <div>
      <div className="create-task">
      <div className="container">
        <div className="col-md-8 m-auto">
        <h1 className="display-4 text-center">Редактировать задачу</h1>

        <form onSubmit={this.onSubmit}>
            <TextAreaFieldGroup
            placeholder="Введите задачу"
            name="text"
            value={this.state.text}
            onChange={this.onChange}
            error={errors.text}                 
          />
          <SelectListGroup
            placeholder="Статус задачи"
            name="status"
            value={this.state.status}
            onChange={this.onChange}
            options={options}
            error={errors.status}          
          />
          
          <input
                type="submit"
                value="Редактировать задачу"
                className="btn btn-info btn-block mt-4"
              />
        </form>
        </div>       
      
      </div>
      
    </div>
      </div>
    )
  }
}

export default EditTask;
