import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Users = () => {
    const [userData, setUserData] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        await axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
            setUserData(res.data);

        })
    }
    const handleDetail = (id) => {
        navigate(`users/${id}`)
    }
    return (
        <div>
            {userData && userData.map((e, i) => {
                return (
                    <div style={{ border: '1px solid', margin: '5px' }} key={i}>
                        <h1>{e.name}</h1>
                        <h3>{e.username}</h3>
                        <h4>{e.phone}</h4>
                        <h6>{e.email}</h6>
                        <button onClick={() => handleDetail(e.id)}>View Details</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Users
