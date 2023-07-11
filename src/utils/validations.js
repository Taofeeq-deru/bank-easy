export const validateSize = (docSize, maxSize = 2) => {
  let _size = docSize / 1018576;
  return _size > maxSize ? `File size cannot be more than ${maxSize}mb` : true;
};

export const validateFileType = (docType, allowedTypeArr) => {
  if (!allowedTypeArr || !docType) return "File format not supported";
  const resp = allowedTypeArr.includes(docType) || "File format not supported";

  return resp;
};

export const validateFileName = (docName, allowedNameArr) => {
  if (!allowedNameArr || !docName) return "File name format not supported";
  const resp =
    docName
      .split(".")
      .slice(1)
      .every((item) => allowedNameArr.includes(item.toLowerCase())) ||
    "File name format not supported";

  return resp;
};
