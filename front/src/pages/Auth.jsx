import React, { useEffect, useState } from 'react'
import * as bootstrap from 'bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import * as bcrypt from 'bcryptjs'
import axios from 'axios'

function Auth() {
    
    

    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    axios.defaults.withCredentials = true

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
    
        axios.post('http://localhost:4444/auth', values).then((res) => {
            if (res.data.Status === 'Success'){
                setValues({
                    username: '',
                    password: '',
                })
                navigate('/')} else {
                    alert(res.data.Error)
                }
        })
      }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-dark'>
        <div className='bg-white p-3 rounded w-50'>
            <form onSubmit={handleSubmit}>
                <h3 className='mb-3 text-center'>Авторизация</h3>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Имя пользователя</label>
                    <input onChange={e => setValues({...values, username: e.target.value})} type="text" className="form-control" id="username"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input onChange={e => setValues({...values, password: e.target.value})} type="password" className="form-control" id="password"/>
                </div>
                <button type="submit" className="btn btn-warning mb-3 w-100">Войти</button>
                <p className='mb-1 mt-3'>Еще нет аккаунта?</p>
                <Link to='/register' className="btn btn-dark">Создать аккаунт</Link>
            </form>
        </div>
    </div>
  )
}

export default Auth