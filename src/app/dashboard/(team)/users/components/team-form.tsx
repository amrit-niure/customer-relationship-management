"use client";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISignUp, userSchema } from "./validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { CirclePlus, PenSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { signUpAction } from "@/app/(auth)/actions";
import { useServerAction } from "zsa-react";
import { PhoneInput } from "@/components/ui/phone-input";
import { updateuserAction } from "../actions";

interface TeamFormProps {
  onClose: () => void;
  initialValues?: ISignUp | null;
  mode?: "create" | "edit";
  memberId?: string;
}
const TeamForm: FC<TeamFormProps> = ({
  onClose,
  initialValues,
  mode = "create",
  memberId,
}) => {
  const { toast } = useToast();
  const form = useForm<ISignUp>({
    resolver: zodResolver(userSchema),
    defaultValues: initialValues || {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      role: "USER",
      title: "",
      phoneNumber: "",
      branch: "AUSTRALIA",
      address: "",
      status: "ACTIVE",
    },
  });

const { execute, isPending } = useServerAction(
    mode === "edit" ? updateuserAction : signUpAction,
    {
      onSuccess() {
          toast({
            variant: "default",
            title: "Action Successful",
            description:
              mode === "edit" ? "Team Member Updated" : "New Team Member Created",
          });
          form.reset();
          onClose();
      },
      onError(result) {
        if (result.err) {
          toast({
            variant: "destructive",
            description: result.err.message,
          });
        } else {
          toast({
            variant: "destructive",
            description: "An unexpected error occurred. Please try again later.",
          });
        }
      },
    }
  );

  const onSubmit = async (values: ISignUp) => {
    if (mode === "edit") {
      const updateData = {
        ...values,
        id: memberId, 
        ...(values.password ? { password: values.password } : {}) // Only include password if provided
      };
      await execute(updateData);
    } else {
      await execute(values);
    }
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle className="flex gap-2 items-center">
          {mode === "edit" ? (
            <>
              <PenSquare />
              Edit Team Member
            </>
          ) : (
            <>
              <CirclePlus />
              Add New Team Member
            </>
          )}
        </SheetTitle>
        <SheetDescription>
          {mode === "edit"
            ? "Update team member details"
            : "Only Admins can create new team members."}
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a branch" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="AUSTRALIA">Australia</SelectItem>
                    <SelectItem value="NEPAL">Nepal</SelectItem>
                    <SelectItem value="DUBAI">Dubai</SelectItem>
                    <SelectItem value="PHILIPPINES">Philippines</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                   <PhoneInput {...field} defaultCountry="AU"/>
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending
              ? "..."
              : mode === "edit"
              ? "Update Member"
              : "Add Member"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default TeamForm;
