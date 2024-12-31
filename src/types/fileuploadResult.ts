interface FileUploadResult {
    success: boolean;
    data: {
      id: string;
      name: string;
      webUrl: string;
      size: number;
      mimeType: string;
      downloadUrl: string;
      uploadedAt: string;
    };
  }