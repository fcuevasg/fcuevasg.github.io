import React from "react";

interface PrimeDirectiveProps{

    content:string
}


export const PrimeDirective =  (props:PrimeDirectiveProps):React.ReactElement=>{
    return(<h3>{props.content}</h3>)
}