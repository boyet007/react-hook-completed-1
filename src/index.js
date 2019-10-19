import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import List from './components/List'
import Edit from './components/Edit'
import Create from './components/Create'
import Show from './components/Show'


const IndexApp = () => {
    return (
        <Router>
            <div>
                <Route render={() => < App />} path="/" />
                <Route render={() => < List />} path="/list" />
                <Route render={() => < Edit />} path="/edit/:id" />
                <Route render={() => < Create />} path="/create" />
                <Route render={() => < Show />} path="/show/:id" />
            </div>
    </Router> )
}

ReactDOM.render(<IndexApp />, document.getElementById('root'));
