/* eslint-disable @typescript-eslint/no-unused-vars */
interface FileUploadResult {
    success: boolean;
    data: {
      documentId: string;
      name: string;
      webUrl: string;
      size: number;
      mimeType: string;
      downloadUrl: string;
      uploadedAt: string;
    };
  }