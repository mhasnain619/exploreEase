import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UserDetails = () => {
    const { id } = useParams()
    const [userData, setUserData] = useState()

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
            return res.json()
        }).then((data) => {
            setUserData(data)
            console.log(data);
        })
    }

    return (
        <div style={{ width: 250, border: '1px solid black', backgroundColor: 'aqua' }}>
            <h1>{userData.name}</h1>
            <h2>{userData.email}</h2>
            <h3>{userData.phone}</h3>
            <h4>{userData.username}</h4>
            <h5>{userData.website}</h5>
        </div>
    )
}

export default UserDetails
