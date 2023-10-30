import { useEffect, useState } from 'react'
import * as bootstrap from 'bootstrap'
import axios from 'axios'
import { supabase } from '../client'

function Home() {
  const [auth, setAuth] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [authSupaBase, setAuthSupaBase] = useState(false)
  axios.defaults.withCredentials = true

  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
        provider: 'github'
    })
}

  const getSupaBaseUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setName(user.user_metadata.name)
      setEmail(user.email)
      setAuthSupaBase(true)
    }
  }

  getSupaBaseUser()

  const supaBaseLogOut = async () =>{
    await supabase.auth.signOut()
    setAuthSupaBase(false)
    location.reload(true)
  }

  useEffect(() => {
    axios.get('http://localhost:4444/').then((res) => {
      if (res.data.Status === 'Success' & authSupaBase === false){
          setAuth(true)
          setName(res.data.name)
          setEmail(res.data.email)
        } else {
          setAuth(false)
        }
  })
  });

  const handleLogout = () => {
    axios.get('http://localhost:4444/logout').then(() => {
            location.reload(true)
        })
  }
  
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-dark'>
        <div className='bg-white p-3 rounded w-50 h-50'>
           { !auth & !authSupaBase ? 
            <div className='d-flex flex-column justify-content-center align-items-center w-100 h-100'>
              <h3 className='text-center'>Добрый день! <br /> Войдите в ваш аккаунт!</h3>
              <button onClick={signInWithGithub} className="btn btn-warning mb-3 w-100">Войти при помощи Github</button>
            </div>
            : authSupaBase ?
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <h3 className='text-center'>Добро пожаловать, {name}! Вы авторизованы при помощи GitHub</h3>
              <h4 className='mt-5'>Email: {email}</h4>
              <button className='btn btn-warning mt-5 w-50' onClick={supaBaseLogOut}>Выйти из аккаунта</button>
            </div>
            : 
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <h3 className='text-center mt-5'>Добро пожаловать, {name}! </h3>
              <h4 className='mt-5'>Email: {email}</h4>
              <button className='btn btn-warning mt-5 w-50' onClick={handleLogout}>Выйти из аккаунта</button>
            </div>}
        </div>
    </div>
  )
 }

export default Home