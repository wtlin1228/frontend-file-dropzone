import { FileSelector } from "./FileSelector";
import "./App.css";
import { useReducer } from "react";

type State = {
  file: null | File;
  errorMessage?: string;
};

type Actions = { type: "changeFile"; file: File } | { type: "clearFile" };

const initialState: State = {
  file: null,
};

const reducer = (_state: State, action: Actions): State => {
  switch (action.type) {
    case "changeFile":
      return { file: action.file };
    case "clearFile":
    default:
      return initialState;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h1>File Selector</h1>
      <FileSelector
        onFileChange={(file: File) => dispatch({ type: "changeFile", file })}
        onFileClear={() => dispatch({ type: "clearFile" })}
        file={state.file}
        accept={[".jpg", ".jpeg", ".png"]}
      />
    </>
  );
}

export default App;
