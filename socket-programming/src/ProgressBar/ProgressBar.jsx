
import { useEffect, useState } from "react";
import "./ProgressBar.css";

import { addItem } from "../store/slice";

import { useDispatch } from "react-redux";

export const ProgressBar = ({ percentage }) => {

   
    const [animatedVal, setAnimate]= useState(0);
    useEffect(()=>{
        setTimeout(() => {
            setAnimate(percentage);
        }, 3000);
    }, [])
    return (
        <>
            <div className="outside">

                {/* width: `${percentage}%`,  */}
                <div style={{ transform: `translateX(${animatedVal - 100}%)` }} className="background-color">
                     <div style={{textAlign:"right", color:"white" }}>{percentage}%</div> 
                </div>
            </div>
        </>
    )
}



export const ValueSupplier = () => {
     const dispatch = useDispatch();
    dispatch(addItem(12));

    return (
        <ProgressBar percentage={30}></ProgressBar>
    )
}
