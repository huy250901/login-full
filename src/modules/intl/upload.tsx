import { log } from "console";

const getCanvasBlob = (canvas: any): any => {
    return new Promise(function (resolve) {
      canvas.toBlob(
        (blob: any) => {
          resolve(blob);
        },
        'image/jpeg',
        1,
      );
    });
  };
  
  export const generateAvatarUpload = async (canvas: any, crop: any) => {
    if (!crop || !canvas) {
      return null;
    }
    let file = null;
    const blobCanvas: Blob = await getCanvasBlob(canvas);
    file = new File([blobCanvas], 'avatar.jpeg', { type: 'image/jpeg' });
    //  console.log("🚀 ~ file: upload.tsx:25 ~ generateAvatarUpload ~ file:", file)
    return file; 
   
  };
   
  