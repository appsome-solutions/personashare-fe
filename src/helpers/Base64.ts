export const FileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(window.btoa(reader.result as string));
    };
    // Read in the image file as a data URL.
    reader.readAsBinaryString(file);
    reader.onerror = error => reject(error);
  });
