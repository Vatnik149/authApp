import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {observer} from "mobx-react-lite";
import LoginForm from './components/LoginForm';
import Store from './store';
import { Context } from '.';
import UserService from './service/UserService';
import { IUser } from './models/IUser';


function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const {store} = useContext(Context);

  async function getUsers(){
    try{
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    }
    catch(e){

    }
  }
  useEffect(()=>{
    if(localStorage.getItem('token')){
      store.checkAuth();
    }
  }, [])
  if(store.isLoading){
    return(
    <div>Загрузка...</div>
    )
  }
  if(!store.isAuth){
    return(
    <LoginForm/>
    )
  }
  else{
    return (
      <div className="App">
        <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}`:`Авторизуйтесь`}</h1>
        <button onClick={()=>store.logout()}>Выйти</button>
        <div>
            <button onClick={()=>getUsers()}>Получить пользователей</button>
        </div>
        {users.map(user=>
          <div key={user.id}>{user.email}</div>
          )}
        </div>
    );
  }
  
}

export default observer(App);
