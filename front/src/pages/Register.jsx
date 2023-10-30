import React, { useState } from 'react'
import * as bootstrap from 'bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import * as bcrypt from 'bcryptjs'
import axios from 'axios'

function Register() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    axios.defaults.withCredentials = true

    const salt = 10

    const handleSubmit = (event) => {
        event.preventDefault()

        const hashedPassword = bcrypt.hashSync(values.password, salt)
    
        const hashedValues = {...values, password: hashedPassword}
    
        axios.post('http://localhost:4444/register', hashedValues).then((res) => {
            if (res.data.Status === 'Success'){
            setValues({
                email: '',
                username: '',
                password: '',
            })
            navigate('/auth')
        }
        })
      }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-dark'>
        <div className='bg-white p-3 rounded w-50'>
            <form onSubmit={handleSubmit}>
                <h3 className='mb-3 text-center'>Регистрация</h3>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Имя пользователя</label>
                    <input onChange={e => setValues({...values, username: e.target.value})} type="text" className="form-control" id="username"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input onChange={e => setValues({...values, email: e.target.value})} type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input onChange={e => setValues({...values, password: e.target.value})} type="password" className="form-control" id="password"/>
                </div>
                <button type="submit" className="btn btn-warning mb-3 w-100">Создать аккаунт</button>
                <p className='mb-1'>Уже есть аккаунт?</p>
                <Link to='/auth' className="btn btn-dark w-25">Войти</Link>
            </form>
        </div>
    </div>
  )
}

export default Register