import React, { useState, useEffect,useRef, Component, Fragment } from 'react';
 

import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

import {AnswersPage} from './pages/answers';
import {NewsDetailPage} from './pages/detailnews';
import {UserInfoPage} from './pages/userinfopage';
import {Form} from './components/Form';
import { TopNews } from './components/TopNews';


import './App.css';
function App(){

  const [blogs,setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [topNews, setTopNews] = useState([]);

  useEffect(()=>{
  axios.get('http://localhost:5000/allquestions')
  .then(res=>{
    setBlogs([...res.data]);
    setLoading(false);
  })
  .catch(err=>console.log(err));

},[]);

useEffect(()=>{
  axios.get('http://localhost:5000/news')
  .then((res)=>{
    if(res.status==200){
      setTopNews(res.data.results);
    }  
  })
  .catch((err)=>{
    console.log(err);
  })
},[]);

  return (
<Router> 
  <header>
    <ul>
    <li><NavLink to="/">Главная страница</NavLink></li>
    <li><NavLink to="/answers">Страница вопросов</NavLink></li>
    </ul>
  </header>
<Switch>
<Route path="/" exact>
  <h3>Главная страница</h3>
  <TopNews />
  
</Route>

<Route path="/answers" exact>
  <AnswersPage isLoading={isLoading}
  blogs={blogs}
  />
</Route>
<Route path="/pdf" exact>
  <UserInfoPage/>
</Route>
<Route path="/docs/:id" exact>
  <NewsDetailPage/>
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