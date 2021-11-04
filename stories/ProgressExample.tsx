import React, { useState } from "react";
import Button from "../lib/components/Button/button";
import Progress from '../lib/components/Progress/progress';

function ProgressExample() {
    const [count, setCount] = useState(30);
    const handleClick1 = ()=>{
        setCount(precount=>{ return precount + 10})
    }
    const handleClick2 = ()=>{
        setCount((precount)=>{ return precount - 10})
    }
    return (
        <div>
            <Button onClick={handleClick1}>+10</Button>
            <Button onClick={handleClick2}>-10</Button>
            <Progress percent={count}></Progress>
        </div>
    );
}

function Progresscircle() {
    const [count, setCount] = useState(30);
    const handleClick1 = ()=>{
        setCount(precount=>{ return precount + 10})
    }
    const handleClick2 = ()=>{
        setCount((precount)=>{ return precount - 10})
    }
    return (
        <div>
            <Button onClick={handleClick1}>+10</Button>
            <Button onClick={handleClick2}>-10</Button>
            <Progress percent={count} circle size={100}></Progress>
        </div>
    );
}


export {ProgressExample,Progresscircle}