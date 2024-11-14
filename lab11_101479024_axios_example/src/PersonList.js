import React, { Component } from 'react';
import axios from 'axios';

axios.get('https://randomuser.me/api/?results=10')
  .then(response => {
    console.log('Data fetched using Axios:', response.data);
  })
  .catch(error => {
    console.error('Error fetching data using Axios:', error);
  });
  
class PersonList extends Component {
    state = {
        persons: []
    }

    componentDidMount() {
        axios.get(`https://randomuser.me/api/?results=10`)
            .then(res => {
                console.log(res.data);
                const persons = res.data.results;
                this.setState({ persons });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    render() {
        return (
            <div className="container mt-4">
                <h2>Person List</h2>
                <div className="row">
                    {this.state.persons.map((person, index) => (
                        <div className="col-12 col-md-4" key={index}>
                            <div className="card">
                                <img
                                    src={person.picture.large}
                                    alt={`${person.name.first} ${person.name.last}`}
                                    className="card-img-top"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{`${person.name.first} ${person.name.last}`}</h5>
                                    <p className="card-text">{person.email}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default PersonList;
