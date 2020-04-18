import React, { useState, useEffect,useRef, Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {AnswersPage} from './pages/answers';
import {BlogItem} from './components/BlogItem'; 
import {BlogContainer} from './components/BlogContainer';
import {Form} from './components/Form';
import {BlogContainerWithButtons} from './components/BlogContainerWithButtons';
import {PdfContainer} from './components/PdfContainer';

function App(){
  const [blogs,setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(()=>{
  axios.get('http://localhost:5000/allquestions')
  .then(res=>{
    setBlogs([...res.data]);
    setLoading(false);
  })
  .catch(err=>console.log(err));
},[]);
  return (
<Router> 
<Switch>
<Route path="/" exact>
  <h3>Main page</h3>
</Route>

<Route path="/answers" exact>
  <AnswersPage isLoading={isLoading}
  blogs={blogs}
  />
</Route>
<Route path="/pdf" exact>
  <PdfContainer/>
</Route>
</Switch>  
 

  {/* <Form style={{marginTop:'1rem'}}/> */}
 
    </Router>
  );
}

export default App;

























{/* <Provider store={store}>
<Button/>
<AnotherComp/>
</Provider> */}