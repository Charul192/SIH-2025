import React from "react";
import './track.css';
import TextField from '@mui/material/TextField';

export default function Track(){
    return(
        <>
            <div className="box">
                <div className="number">
                    <p>Track By Bus Number</p>
                    <div className="numb">
                        <TextField id="outlined-basic" label="Bus Number" variant="outlined" />
                    </div>
                </div>
                <form className="sourcedest">
                <p>Enter Source And Destination</p>
                <TextField id="outlined-basic" label="Source" variant="outlined"/>
                <TextField id="outlined-basic" label="Destination" variant="outlined" />
</form>
            </div>
        </>
    )
}