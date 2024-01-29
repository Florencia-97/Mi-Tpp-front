import { Button } from "@mui/material";

export default function IconButton({icon, onClick, styles={}}) {
    return (
      <Button style={styles} onClick={onClick}>
        {icon}
      </Button>
    )
  }