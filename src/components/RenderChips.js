import {Chip} from "@mui/material";

export default function RenderChips({tags, removeTagNamed}) {

  const renderChipCanBeDeleted = (tagName) => {
    return (
      <Chip
        label={tagName}
        onDelete={removeTagNamed(tagName)}
      />
    );
  }

  const renderChipCannotBeDeleted = (tagName) => {
    return (
      <Chip
        label={tagName}
      />
    );
  }


  const chips = tags.map((tagName) =>
    removeTagNamed ? renderChipCanBeDeleted(tagName) : renderChipCannotBeDeleted(tagName)
  )
  return (
    <div>
      {chips}
    </div>
  );
}