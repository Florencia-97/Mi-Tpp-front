import { Button } from "@mui/material"
import React from "react";

export default function OutlineButton({onClick, label, styles}) {
    return (
        <Button style={styles} variant="outlined" onClick={onClick}>
            {label}
        </Button>
    )
}