import { useRef, useState } from "react";
import CloudUploadSVG from "../assets/cloud_upload.svg";
import { parseFile } from "./parseFile";
import { type FileSpecifier } from "./type";
import "./FileSelector.css";

interface IFileSelectorProps {
  file: null | File;
  onFileChange: (file: File) => void;
  onFileClear: () => void;
  accept: [FileSpecifier, ...FileSpecifier[]];
  errorMessage?: string;
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
  const error = props.errorMessage || errorMessage;

  return (
    <div className="file-selector">
      {props.file !== null && (
        <div className="file-selector__display-wrapper">
          <div className="file-selector__file-description">
            <div className="ellipsis">{name}</div>
            <div className="no-flex-shrink">{extension}</div>
            <button
              className="file-selector__clear-file no-flex-shrink"
              onClick={handleFileClear}
            >
              x
            </button>
            <label
              className="file-selector__select-button button-like no-flex-shrink"
              htmlFor="file-selector"
            >
              choose another file
            </label>
          </div>
          {error && <div className="file-selector__file-error">{error}</div>}
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
