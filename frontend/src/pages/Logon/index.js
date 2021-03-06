import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'; 

import api from '../../services/api'
import './styles.css';

import LogoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {

  const history = useHistory();
  const [ id, setOngId ] = useState('');

  async function handleLogin(e){
    e.preventDefault();
    const data = { id }

    try{
      const response = await api.post('sessions', data); 
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');

    }catch (err){
      console.log("Erro no Logon, tente novamete");
    }

  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={LogoImg} alt="Be The Hero"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setOngId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="backlink" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>

      </section>
      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}
