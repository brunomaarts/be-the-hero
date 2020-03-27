import React, { useState, useEffect } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'; 

import api from '../../services/api'
import './styles.css';

import LogoImg from '../../assets/logo.svg'

export default function Profile() {

  const [ incidents, setIncidents ] = useState([]);
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  useEffect(() => {
    
    api.get('/profile', {
      headers: {
        Authorization: ongId
      }
    }).then( res => {
      setIncidents(res.data);
    });

  }, [ongId]);


  async function handleDeleteIncident(id) {
    try{
      await api.delete(`incidents/${id}`,{
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id ));

    }catch(err){
      console.log("Erro ao deletar o caso, tente novamente");
    }
  }


  function handdleLogout() {
    localStorage.clear();
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={LogoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">Cadatrar novo caso</Link>

        <button type="button" onClick={handdleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>

      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {
          incidents.map(incident => (
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{incident.description}</p>

              <strong>Valor:</strong>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

              <button type="button" onClick={() => handleDeleteIncident(incident.id)} > 
                <FiTrash2  size={20} color="#a8a8b3"/> 
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
