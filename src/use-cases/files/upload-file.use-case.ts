import { uploadToOneDrive } from "@/lib/onedrive/upload";

export async function uploadFileUseCase(file: File, fileName: string, folderPath: string) {
  const fileData = await file.arrayBuffer();
  const buffer = Buffer.from(fileData);
  const result =  await uploadToOneDrive({
    fileName,
    folderPath,
    buffer: buffer,
    onProgress: (progress) => {
      console.log(`Upload progress: ${progress}%`);
    }
  });
  const transformedResult: FileUploadResult = {
    success: result.success,
    data: {
      documentId: result.data.id,
      name: result.data.name,
      webUrl: result.data.webUrl,
      size: result.data.size,
      mimeType: result.data.file.mimeType,
      downloadUrl: result.data["@microsoft.graph.downloadUrl"],
      uploadedAt: result.data.createdDateTime,
    },
  };
  return transformedResult;
}