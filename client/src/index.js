// import the React module from its location at the react node module folder
import React from 'react';

// Render is not the default export of react-dom therefore we use curly braces.
// This render function is the key to inserting react into the front-end, so 
// it allows us to dynamically insert react components into the HTML document.
import { render } from 'react-dom';

import * as ReactDOM from 'react-dom';

// nodeJS, recall that we use the require keyword which is part of the system
// called the commonJS project. However, the 2015 version of JavaScript, called
// es6 added support for loading content through an import syntax

import { createRoot } from 'react-dom/client';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import history from './history';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(
  document.getElementById('root')
);
//const root = createRoot();

import App from './components/App';
import Blocks from './components/Blocks';
import ConductTransaction from './components/ConductTransaction';
import TransactionPool from './components/TransactionPool';
import './index.css';

//console.log('JavaScript hello!');

// This mark-up is not actually HTML! 
// The mark-up you are seeing here is JSX, short for JavaScript XML-like syntax
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='blocks' element={<Blocks />} />
      <Route path='conduct-transaction' element={<ConductTransaction />} />
      <Route path='transaction-pool' element={<TransactionPool />} />
    </Routes>
  </BrowserRouter>
)