import React from 'react'
import { useState, useEffect } from 'react';
import { setLocale } from 'yup';

const AutoTimer = (props) => {
    // const { initialMinute = 0, initialSeconds = 0 } = props;
    const [hours, setHours] = useState(props.hours);
    const [minutes, setMinutes] = useState(props.minutes);
    const [seconds, setSeconds] = useState(props.seconds);
    // const [end, setEnd] = useState(120)
    useEffect(() => {
        // setSeconds(0)
        let myInterval = setInterval(() => {
            if (seconds >= 0) {
                setSeconds(seconds + 1);
            }
            if (seconds === 59) {
                setMinutes(minutes + 1);
                setSeconds(0)
                // if (minutes === 0) {
                //     clearInterval(myInterval)
                // } else {
                //     setMinutes(minutes - 1);
                //     setSeconds(59);
                // }
            }
            if (minutes === 59) {
                setHours(hours + 1);
                setSeconds(0)
                setMinutes(0)
                // if (minutes === 0) {
                //     clearInterval(myInterval)
                // } else {
                //     setMinutes(minutes - 1);
                //     setSeconds(59);
                // }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    }, [seconds]);

    return (
        <div>
            {minutes === 0 && seconds === 0
                ? null
                : <h1> {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            }
        </div>
    )
}

export default AutoTimer;