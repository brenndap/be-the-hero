import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import logo from '../../assets/logo.svg'

import api from '../../services/api'

import './style.css'

export default function Profile() {

    const [incidents, setIncidents] = useState([])
    const history = useHistory()

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: localStorage.getItem('ongId')
            }
        }).then(res => {
            setIncidents(res.data)
        })
    }, [])

    const handleDeleteIncident = async (id) => {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization: localStorage.getItem('ongId')
                }
            }).then(res => {
                setIncidents(incidents.filter(incident => incident.id != id))
            })
        } catch (err) {
            alert('Error ao excluir o caso, tente novament.')
        }
    }

    const handleLogout = () => {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <div>
                    <img src={logo} alt="Be the hero" />
                    <p>Bem-vinda, {localStorage.getItem('ongName')}</p>
                </div>
                <div className="actions">
                    <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
                    <button onClick={() => handleLogout()} type="button" className="logout-button">
                        <FiPower size={16} color="#E02041" />
                    </button>
                </div>
            </header>
            <section className="incidents-container">
                <h1>Casos cadastrados</h1>
                {incidents.length ? <ul>
                    {incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>Caso:</strong>
                            <p>{incident.title}</p>

                            <strong>Descrição:</strong>
                            <p>{incident.description}</p>

                            <strong>Valor:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))}
                </ul> : <p>Nenhum caso cadastrado. :(</p>}
            </section>
        </div>
    )
}