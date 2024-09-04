import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const UsersList = () => {
    const [users, setUsers] = useState([])
    const fetchData = async () => {
        const response = await axios.get('http://localhost:8080/api/users')
        return setUsers(response.data)
    }
    useEffect(() => {
        fetchData()
    }, [])

  return (
    <>
    {users.map((users) => (<div className='bg-white' key={users._id}>
        <p>{users._id}</p>
        <p>{users.role}</p>
        <p>{users.first_name}</p>
        <p>{users.last_name}</p>
        <p>{users.age}</p>
        <p>{users.email}</p>
        </div>))}
    </>
  )
}

export default UsersList