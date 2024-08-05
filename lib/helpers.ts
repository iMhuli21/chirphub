export function checkFileType(file: File) {
  const imageTypes = /^jpg|jpeg|png/i;

  const fileExtension = file.name.split('.')[1];

  if (imageTypes.test(fileExtension)) {
    return true;
  } else {
    return false;
  }
}
