import { useState } from "react";
import CloudUploadSVG from "./assets/cloud_upload.svg";

const getFileNameAndExtension = (
  file: null | File
): {
  name: string;
  extension: string;
  errorMessage?: string;
} => {
  if (file === null) {
    return {
      name: "",
      extension: "",
    };
  }

  const lastDotIdx = file.name.lastIndexOf(".");

  return {
    name: file.name.slice(0, lastDotIdx),
    extension: file.name.slice(lastDotIdx),
    errorMessage: "error message",
  };
};

interface IFileSelectorProps {
  onFileChange: (file: File) => void;
  onFileClear: () => void;
  file: null | File;
}

export const FileSelector: React.FC<IFileSelectorProps> = (props) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const { name, extension, errorMessage } = getFileNameAndExtension(props.file);

  return (
    <div className="file-selector">
      {props.file !== null && (
        <div className="file-selector__display-wrapper">
          <div className="file-selector__file-description">
            <div>{name}</div>
            <div>{extension}</div>
            <button
              className="file-selector__clear-file"
              onClick={props.onFileClear}
            >
              x
            </button>
            <label
              className="file-selector__select-button button-like"
              htmlFor="file-selector"
            >
              choose another file
            </label>
          </div>
          {errorMessage && (
            <div className="file-selector__file-error">{errorMessage}</div>
          )}
        </div>
      )}

      <div
        className={`file-selector__dropzone ${
          isDraggingOver && "file-selector__dropzone--highlight"
        } ${props.file !== null && "file-selector__dropzone--hidden"}`}
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
          or, <span className="file-selector__select-button">select one</span>
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
          }}
        />
      </div>
    </div>
  );
};
