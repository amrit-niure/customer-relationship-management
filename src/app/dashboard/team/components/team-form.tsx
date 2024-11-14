"use client";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISignUp, userSchema } from "@/app/validation/user";
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
// import { signUp, updateMember } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { signUpAction } from "@/app/(auth)/actions";

interface TeamFormProps {
  onClose: () => void;
  initialValues?: ISignUp | null;
  mode?: "create" | "edit";
  memberId?: string;
}

const countryCodeMap = {
  AUSTRALIA: "+61",
  NEPAL: "+977",
  DUBAI: "+971",
  PHILIPPINES: "+63",
};

const TeamForm: FC<TeamFormProps> = ({
  onClose,
  initialValues,
  mode = "create",
  memberId,
}) => {
  const { toast } = useToast();
  const [countryCode, setCountryCode] = useState("+61");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  async function onSubmit(values: ISignUp) {
    setIsSubmitting(true);
    try {
      let res;

      if (mode === "edit" && memberId) {
        // Update existing member
        res = await updateMember(memberId, values);
      } else {
        res = await signUpAction(values);
      }

      if (res.error) {
        toast({
          variant: "destructive",
          description: res.error,
        });
      } else {
        toast({
          variant: "default",
          title: "Action Successful",
          description:
            mode === "edit" ? "Team Member Updated" : "New Team Member Created",
        });
        form.reset();
        onClose();
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "branch" && value.branch) {
        setCountryCode(countryCodeMap[value.branch] || "+61");
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

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
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                      {countryCode}
                    </span>
                    <Input type="tel" className="rounded-l-none" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormItem className="w-full">
            <FormLabel>Phone Number</FormLabel>
            <Controller
              name="phoneNumber"
              control={form.control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  country={"au"}
                  value={value}
                  onChange={onChange}
                  inputStyle={{
                    width: "100%",
                    height: "40px",
                    fontSize: "16px",
                    paddingLeft: "48px",
                    borderRadius: "4px",
                    border: "1px solid #d1d5db",
                  }}
                  buttonStyle={{
                    border: "1px solid #d1d5db",
                    borderRight: "none",
                    borderRadius: "4px 0 0 4px",
                  }}
                  containerStyle={{
                    width: "100%",
                  }}
                  containerClass="react-tel-input"
                  inputClass="phone-input"
                  dropdownStyle={{
                  }}
                  searchClass="w-full"
                  enableSearch
                  disableSearchIcon
                  // onlyCountries={['np','ph','ae','au']}
                  countryCodeEditable={false}
                  enableAreaCodes={true}
                  searchPlaceholder="Search countries"
                />
              )}
            />
            {errors.phoneNumber && (
              <FormMessage>{errors.phoneNumber.message}</FormMessage>
            )}
          </FormItem> */}

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
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting
              ? "Processing..."
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
