import React, { useState, useEffect,useRef, Component, Fragment } from 'react';
import {useDispatch} from 'react-redux';
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
import {AllNewsPage} from './pages/allnewspage';

import {LoginForm} from './components/LoginForm';
import {Form} from './components/Form';
import { TopNews } from './components/TopNews';

 import {ProtectedRoute} from './components/ProtectedRoute';
import {getTopNewsAsync} from './actions';

import './App.css';
function App(){

  const [blogs,setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [topNews, setTopNews] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getTopNewsAsync());
},[]);
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

<Route path="/login" exact>

<LoginForm/>   
</Route>
<ProtectedRoute path="/protected" exact 
component={()=><AnswersPage isLoading={isLoading}
  blogs={blogs}/>}>
   
  </ProtectedRoute>

<Route path="/answers" exact>
  <AnswersPage isLoading={isLoading}
  blogs={blogs}
  />
</Route>
<Route path="/docs" exact>
   <AllNewsPage/>
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