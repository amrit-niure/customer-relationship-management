// "use client"

// import {
//   useForm
// } from "react-hook-form"
// import {
//   zodResolver
// } from "@hookform/resolvers/zod"
// import {
//   Button
// } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import {
//   Input
// } from "@/components/ui/input"
// import { IClientDocuments, clientDocumentsSchema } from "../../schema"


// interface ClientFileUploadProps {
//   formData?: IClientDocuments;
//   updateForm: (data: IClientDocuments) => void;
//   handlePrevious: () => void;
// }


// export default function ClientFileUploadForm({ formData, updateForm, handlePrevious }: ClientFileUploadProps): JSX.Element {

//   const form = useForm <IClientDocuments> ({
//     resolver: zodResolver(clientDocumentsSchema),
//   })

//   const onSubmit = (data: IClientDocuments) => {
//     alert("Submitted")
//     updateForm(data);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
//         <FormField
//           control={form.control}
//           name="documentName"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Finish</FormLabel>
//               <FormControl>
//                 <Input 
//                 placeholder="shadcn"
                
//                 type=""
//                 {...field} />
//               </FormControl>
//               <FormDescription>This is your public display name.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       <div className="flex justify-between">
//         <Button type="button" onClick={handlePrevious} variant="outline">Previous</Button>
//         <Button type="submit">Submit</Button>
//       </div>
//       </form>
//     </Form>
//   )
// }