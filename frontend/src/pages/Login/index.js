import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

 
import './style.css'

import api from '../../services/api'

import logo from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Login() {

    const [id, setId] = useState('')
    const history = useHistory()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post('sessions', { id })
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)
            history.push('/profile')
        } catch(err) {
            alert('ID inválido, tente novamente.')
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logo} alt="Be the hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value.trim())}/>
                    <button className="button" type="submit">Entrar</button>

                    <Link to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />

        </div>
    )
}