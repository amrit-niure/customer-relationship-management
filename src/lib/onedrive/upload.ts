import { getGraphClient } from './graphClient';

interface UploadOptions {
  fileName: string;
  folderPath?: string;
  buffer: Buffer | ArrayBuffer;
  onProgress?: (progress: number) => void;
}


export async function uploadToOneDrive({
    fileName,
    folderPath = "root",
    buffer,
    onProgress,
  }: UploadOptions) {
    const graphClient = getGraphClient();
    const fileSize = buffer.byteLength;
  
    try {
      // Corrected endpoint without colon after root
      const driveItemEndpoint = `/drive/${folderPath === "root" ? "root" : `root:/${folderPath}`}/${fileName}:/content`;
  
      // For files smaller than 4MB, use single upload
      if (fileSize < 4 * 1024 * 1024) {
        const driveItem = await graphClient.api(driveItemEndpoint).put(buffer);
        return { success: true, data: driveItem };
      }
  
      // For larger files, use upload session
      const uploadSession = await graphClient
        .api(`/drive/${folderPath === "root" ? "root" : `root:/${folderPath}`}/${fileName}:/createUploadSession`)
        .post({});
  
      const maxChunkSize = 320 * 1024; // 320 KB chunks
      const arrayBuffer = buffer instanceof Buffer ? buffer : new Uint8Array(buffer);
      let uploadedBytes = 0;
  
      // Upload chunks
      for (let i = 0; i < arrayBuffer.length; i += maxChunkSize) {
        const chunk = arrayBuffer.slice(i, Math.min(i + maxChunkSize, arrayBuffer.length));
        const range = `bytes ${i}-${Math.min(i + chunk.length - 1, arrayBuffer.length - 1)}/${arrayBuffer.length}`;
  
        await fetch(uploadSession.uploadUrl, {
          method: 'PUT',
          headers: {
            'Content-Length': `${chunk.length}`,
            'Content-Range': range,
          },
          body: chunk,
        });
  
        uploadedBytes += chunk.length;
        onProgress?.(Math.round((uploadedBytes / fileSize) * 100));
      }
  
      // Get the final drive item
      const driveItem = await graphClient.api(`/drive/${folderPath === "root" ? "root" : `root:/${folderPath}`}/${fileName}`).get();
      return { success: true, data: driveItem };
    } catch (error) {
      throw error;
    }
  }
  