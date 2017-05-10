// @flow
import React from 'react';
import ReactDOM from 'react-dom';

let x:string; // webpack/babel must remove type here!
x = 'Search me in the compiled bundle!';

let t:string;
t = 12345; // Flow must detect error here!

// webpack/babel must transpile JSX to JS below:
ReactDOM.render(
  <h1>Hello from React WITH BABEL</h1>,
  document.getElementById('root')
);
