"use client";
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
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  clientBasicInfoSchema,
  IClientBasicInfo,
  IClientFull,
} from "../../schema";
import { sanitizeData } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { CloudUpload, ImageDown } from "lucide-react";
import Image from "next/image";

interface ClientBasicInfoFormProps {
  formData?: IClientFull;
  updateForm: (data: IClientBasicInfo) => void;
  handleNext: () => void;
}

export default function ClientBasicInfoForm({
  formData,
  updateForm,
  handleNext,
}: ClientBasicInfoFormProps) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg"],
    },
  };

  const form = useForm<IClientBasicInfo>({
    resolver: zodResolver(clientBasicInfoSchema),
    defaultValues: sanitizeData(formData?.clientBasicInfo) || {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      passportNumber: "",
      isActive: true,
    },
  });
  useEffect(() => {
    if (!files || files.length === 0) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(files[0]);
    setPreview(objectUrl);

    // Free memory when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  }, [files]);

  const onSubmit = (data: IClientBasicInfo) => {
    updateForm(data);
    handleNext();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-4 col-span-12">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Amrit" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:col-span-4 col-span-12">
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:col-span-4 col-span-12">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Niure" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@xyz.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Phone number</FormLabel>
              <FormControl className="w-full">
                <PhoneInput placeholder="" {...field} defaultCountry="TR" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="2 Some Road , Sydney, Australia"
                  type="text"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-12 md:col-span-6">
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value === "active")}
                  defaultValue={field.value ? "active" : "passive"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="passive">Passive</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-6 col-span-12">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <div>
                      <FormDescription>
                        Select an image for avatar.
                      </FormDescription>
                      <FileUploader
                        value={files}
                        onValueChange={setFiles}
                        dropzoneOptions={dropZoneConfig}
                        className="relative bg-background rounded-lg py-4 px-1 w-fit"
                      >
                        {!preview && (
                          <FileInput
                            id="fileInput"
                            className="outline-dashed outline-1 outline-slate-500"
                          >
                            <div className="flex items-center justify-center flex-col p-4 w-fit">
                              <CloudUpload className="text-gray-500 w-6 h-6" />
                              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>
                                &nbsp; or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF
                              </p>
                            </div>
                          </FileInput>
                        )}
                        {preview && (
                          <div className=" flex  flex-col gap-4 relative w-32 h-32">
                            <Image
                              src={preview}
                              alt="Preview"
                              width={100}
                              height={100}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        )}
                        <FileUploaderContent>
                          {files &&
                            files.length > 0 &&
                            files.map((file, i) => (
                              <FileUploaderItem
                                key={i}
                                index={i}
                                className="w-32"
                              >
                                <ImageDown className="h-4 w-4 stroke-current" />
                                <span className="truncate block">
                                  {file.name}
                                </span>
                              </FileUploaderItem>
                            ))}
                        </FileUploaderContent>
                      </FileUploader>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex items-center">
          <Button type="submit" className="ml-auto">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
