'use client';

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CloudUpload, Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";

import { IClientDocuments, clientDocumentsSchema } from "../../schema";
import { uploadFileAction } from "../../actions";


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

interface ClientFileUploadProps {
  formData?: IClientDocuments;
  updateForm: (data: IClientDocuments) => void;
  handlePrevious: () => void;
}

export default function ClientFileUploadForm({
  formData,
  updateForm,
  handlePrevious,
}: ClientFileUploadProps) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  const form = useForm<IClientDocuments>({
    resolver: zodResolver(clientDocumentsSchema),
  });
  const onSubmit = async (data: IClientDocuments) => {
    if (!files || files.length === 0) {
      toast.error("Please select at least one file.");
      return;
    }
  
    setIsUploading(true);
    try {
      for (const file of files) {
        if (file.size > MAX_FILE_SIZE) {
          throw new Error(`File ${file.name} exceeds size limit!`);
        }
  
        // Converting the file to base64
        const fileData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
        });

        const result = await uploadFileAction(fileData, file.name, `Documents/Uploads`);
        
        if (!result.success) {
          throw new Error(`Failed to upload ${file.name}: ${result.error}`);
        }
        
        toast.success(`Successfully uploaded ${file.name}`);
      }
  
      updateForm(data);
    } catch (error: Error | any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload files');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="fileNames"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select File</FormLabel>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={(uploadedFiles) => {
                    setFiles(uploadedFiles);
                    if (uploadedFiles) {
                      form.setValue(field.name, uploadedFiles);
                    }
                    form.clearErrors(field.name);
                  }}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full">
                      <CloudUpload className="text-gray-500 w-10 h-10" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Paperclip className="h-4 w-4 stroke-current" />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormDescription>Select a file to upload.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button 
            type="button" 
            onClick={handlePrevious} 
            variant="outline"
            disabled={isUploading}
          >
            Previous
          </Button>
          <Button 
            type="submit"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
}