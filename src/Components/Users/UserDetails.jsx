import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState(null); // Initialize as null

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                const data = await response.json();
                setUserData(data); // Update the state with fetched data
                console.log(data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        getData();
    }, [id]); // Re-run effect if ID changes

    // Render loading or error message when userData is null
    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ width: 450, border: '1px solid black', backgroundColor: 'aqua', padding: 10 }}>
            <h1>{userData.name}</h1>
            <h2>{userData.email}</h2>
            <h3>{userData.phone}</h3>
            <h4>{userData.username}</h4>
            <h5>{userData.website}</h5>
        </div>
    );
};

export default UserDetails;
