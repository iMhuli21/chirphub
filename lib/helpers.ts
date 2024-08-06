export function checkFileType(file: File) {
  const imageTypes = /^jpg|jpeg|png/i;

  const fileExtension = file.name.split('.')[1];

  if (imageTypes.test(fileExtension)) {
    return true;
  } else {
    return false;
  }
}

export function checkContent(message: string, files: string[]) {
  if (message.length === 0 && files.length === 0) {
    return {
      error: 'Cannot create post, no image or text added.',
    };
  }
}
