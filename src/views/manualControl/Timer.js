import React from 'react'
import { useState, useEffect } from 'react';
import { setLocale } from 'yup';

const Timer = (props) => {
    // const { initialMinute = 0, initialSeconds = 0 } = props;
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [end, setEnd] = useState(120)
    useEffect(() => {
        if (props.status == 'toggle' && seconds < end) {
            // setSeconds(0)
            let myInterval = setInterval(() => {
                if (seconds >= 0) {
                    setSeconds(seconds + 1);
                }
                // if (seconds === 59) {
                //     if (minutes === 0) {
                //         clearInterval(myInterval)
                //     } else {
                //         setMinutes(minutes - 1);
                //         setSeconds(59);
                //     }
                // }
            }, 1000)
            return () => {
                clearInterval(myInterval);
            };
        }
    }, [seconds]);

    return (
        <div>
            {minutes === 0 && seconds === 0
                ? null
                : <h1> {seconds < 10 ? `0${seconds}` : seconds}</h1>
            }
        </div>
    )
}

export default Timer;