import {Chip} from "@mui/material";

export default function RenderChips({tags, removeTagNamed}) {
  const chips = tags.map(tagName => {
    return <Chip
      label={tagName}
      onDelete={removeTagNamed(tagName)}
    />
  })
  return (
    <div>
      {chips}
    </div>
  );
}