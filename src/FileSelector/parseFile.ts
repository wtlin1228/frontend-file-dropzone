import { type FileSpecifier } from "./type";

export const parseFile = (
  file: null | File,
  accept: [FileSpecifier, ...FileSpecifier[]]
): {
  name: string;
  extension: string;
  errorMessage: null | string;
} => {
  if (file === null) {
    return {
      name: "",
      extension: "",
      errorMessage: null,
    };
  }

  const lastDotIdx = file.name.lastIndexOf(".");
  const extension = file.name.slice(lastDotIdx);

  return {
    name: file.name.slice(0, lastDotIdx),
    extension,
    errorMessage: accept.includes(extension as FileSpecifier)
      ? null
      : "invalid file",
  };
};
