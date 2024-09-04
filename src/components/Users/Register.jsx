import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
const Register = () => {
  const { register, handleSubmit } = useForm()
  const { signup, isAuthenticated } = useAuthContext()
  const onSubmit = handleSubmit(async (values) => {
    signup(values)
  })
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) { navigate('/profile') }
  }, [isAuthenticated])


  return (
    <div className='py-2'>
      <h1 className='text-center'>Formulario de Registro</h1>
      <form className='d-flex flex-column px-5 '
        onSubmit={onSubmit}>

        <input type="text" {...register("first_name", { required: true })} name='first_name' placeholder='first name' />
        <input type="text" {...register("last_name", { required: true })} name='last_name' placeholder='last name' />
        <input type="number"{...register("age", { required: true })} name='age' placeholder='age' />
        <input type="email" {...register("email", { required: true })} name='email' placeholder='email' />
        <input type="password"{...register("password", { required: true })} name='password' placeholder='password' />
        <button type='submit'></button>
        <button type='submit' className='btn btn-primary'>Register</button>
      </form >
    </div >
  )
}

export default Register