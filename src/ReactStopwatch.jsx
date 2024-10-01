import React, {useState, useEffect, useRef} from "react";

function ReactStopwatch() {

    const [running, setRunning] = useState(false);
    const [passedTime, setPassedTime] = useState(0);
    const timeSpanIdRef = useRef(null);
    const initialTimeRef = useRef(0);

    useEffect(() => {
        if(running) {
            timeSpanIdRef.current = setInterval(() => {
                setPassedTime(Date.now() - initialTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(timeSpanIdRef.current);
        }

    }, [running]);

    function start() {
        setRunning(true);
        initialTimeRef.current = Date.now() - passedTime;
        console.log(initialTimeRef);
        console.log(timeSpanIdRef.current);
    }
    
    function stop() {
        setRunning(false);
    }

    function erase() {
        setRunning(false);
        setPassedTime(0);
    }
    
    function timeFormat() {
        let hours = String(Math.floor(passedTime / (1000 * 60 * 60))).padStart(2,"0");
        let minutes = String(Math.floor(passedTime / (1000 * 60) % 60)).padStart(2,"0");
        let seconds = String(Math.floor((passedTime / 1000) % 60)).padStart(2,"0");
        let millisec = String(Math.floor((passedTime % 1000) / 10)).padStart(2,"0");

        return `${hours}:${minutes}:${seconds}:${millisec}`;
    }
    
    return(
        <div className="container">
            <div className="stopwatch-display">
                {timeFormat()}
            </div>
            <div className="controls-panel">
                <button className="start-btn" onClick={start}>START</button>
                <button className="stop-btn" onClick={stop}>STOP</button>
                <button className="erase-btn" onClick={erase}>ERASE</button>
            </div>
        </div>
    );
}

export default ReactStopwatch;