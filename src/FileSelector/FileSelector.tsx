import { useRef, useState } from "react";
import CloudUploadSVG from "../assets/cloud_upload.svg";
import { parseFile } from "./parseFile";

import { type FileSpecifier } from "./type";

interface IFileSelectorProps {
  onFileChange: (file: File) => void;
  onFileClear: () => void;
  accept: [FileSpecifier, ...FileSpecifier[]];
  file: null | File;
}

export const FileSelector: React.FC<IFileSelectorProps> = (props) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileClear = () => {
    props.onFileClear();
    if (inputRef.current) {
      // clear input's value so user can select the same file again
      inputRef.current.value = "";
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      handleFileClear();
      return;
    }
    props.onFileChange(file);
  };

  const { name, extension, errorMessage } = parseFile(props.file, props.accept);

  return (
    <div className="file-selector">
      {props.file !== null && (
        <div className="file-selector__display-wrapper">
          <div className="file-selector__file-description">
            <div>{name}</div>
            <div>{extension}</div>
            <button
              className="file-selector__clear-file"
              onClick={handleFileClear}
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
          ref={inputRef}
          className="file-selector__input"
          id="file-selector"
          name="file-selector"
          type="file"
          accept={props.accept.join(",")}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};