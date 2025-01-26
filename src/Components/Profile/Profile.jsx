import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [counter, setCounter] = useState(0);

    const runFunc = () => {
        setCounter(counter + 1);
    };

    const func = () => {
        // console.log('function calling inside useEffect');
    };
    const runFunc2 = () => {
        // console.log('function 2 calling');

    };
    useEffect(() => {
        runFunc2()
        setTimeout(() => {
            // console.log('updating data.......!');
        }, 2000);
    }, [])
    useEffect(() => {
        setTimeout(() => {
            func();
        }, 3000)
    }), [counter];

    return (
        <div>
            <h1>
                Profile {counter}
            </h1>
            <button onClick={runFunc}>Click ME</button>
            <button onClick={runFunc2}>Click ME Second..</button>
        </div>
    );
};

export default Profile;
