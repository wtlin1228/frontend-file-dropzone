import { useState } from "react";
import CloudUploadSVG from "./assets/cloud_upload.svg";

const getFileNameAndExtension = (
  file: null | File
): {
  name: string;
  extension: string;
} => {
  if (file === null) {
    return {
      name: "",
      extension: "",
    };
  }

  let lastDotIdx = 0;

  for (let i = file.name.length - 1; i >= 0; i--) {
    if (file.name[i] === ".") {
      lastDotIdx = i;
      break;
    }
  }

  return {
    name: file.name.slice(0, lastDotIdx),
    extension: file.name.slice(lastDotIdx),
  };
};

interface IFileSelectorProps {
  onFileChange: (file: File) => void;
  onFileClear: () => void;
  file: null | File;
}

export const FileSelector: React.FC<IFileSelectorProps> = (props) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const { name, extension } = getFileNameAndExtension(props.file);

  return (
    <div className="file-selector">
      {props.file !== null ? (
        <div>
          <div>{name}</div>
          <div>{extension}</div>
        </div>
      ) : (
        <div
          className={`file-selector__dropzone ${
            isDraggingOver && "file-selector__dropzone--highlight"
          }`}
          onDragOver={() => {
            if (!isDraggingOver) {
              setIsDraggingOver(true);
              console.log("drag over");
            }
          }}
          onDragLeave={() => {
            if (isDraggingOver) {
              setIsDraggingOver(false);
              console.log("drag leave");
            }
          }}
          onDrop={() => {
            setIsDraggingOver(false);
            console.log("drop");
          }}
        >
          <img className="file-selector__icon" src={CloudUploadSVG} />
          <label htmlFor="file-selector">
            drag and drop your file here
            <br />
            or, <span className="file-selector__button">select one</span>
          </label>
          <input
            className="file-selector__input"
            id="file-selector"
            name="file-selector"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) {
                props.onFileClear();
                return;
              }

              props.onFileChange(file);

              console.log(getFileNameAndExtension(file));
            }}
          />
        </div>
      )}
    </div>
  );
};
