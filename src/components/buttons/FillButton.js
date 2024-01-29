import { Button } from "@mui/material"
import React from "react";

export default function FillButton({onClick, label, styles, disabled=false}) {
    return (
        <Button style={styles} variant="contained" onClick={onClick} disabled={disabled}>
            {label}
        </Button>
    )
}