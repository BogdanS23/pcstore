import Header from "../components/Header.jsx";
import PCResultComponent from "../components/ResComp/PCResultComponent.jsx";
import {Button} from "@mui/material";
import {useState} from "react";

export const PCPage = () => {

    return(
        <>
            <Header isPCPage/>
            <div style={{ display: "flex", justifyContent: "center"}}>
                <PCResultComponent/>
            </div>


        </>
    )
}