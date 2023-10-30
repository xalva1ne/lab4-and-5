import React from 'react'
import * as bootstrap from 'bootstrap'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-dark d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3">
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 ms-5">
            <li><Link to='/' className="nav-link px-2 link-warning">Главная</Link></li>
        </ul>

        <div className="col-md-3 text-end me-5">
            <Link to='/auth' className="btn btn-outline-warning me-2">Авторизация</Link>
            <Link to='/register' className="btn btn-warning">Регистрация</Link>
        </div>
    </header>
  )
}

export default Header