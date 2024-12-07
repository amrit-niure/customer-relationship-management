import DisplayCard from "@/components/display-card";
import PageHeaderWithoutForm from "@/components/headers/page-header-without-form";
import { withServerAuth } from "@/lib/protected-server-pages";
import { Calendar } from "lucide-react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { Customer } from "@/db/schema/customers";

async function getData(): Promise<Customer[]> {
  // Fetch data from your API here.
  return [
    {
      id: "e13bdc8b-58b1-4e9a-a8fa-7e0d5e55633e",
      firstName: "John",
      middleName: "Michael",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      phone: "+61412345678",
      address: "123 Elm Street, Sydney, NSW, Australia",
      passportNumber: "M1234567",
      currentVisa: "SUB_186",
      visaExpiry: new Date("2025-12-01T00:00:00Z"),
      createdAt: new Date("2024-12-01T12:00:00Z"),
      updatedAt: new Date("2024-12-01T12:00:00Z"),
    },
    {
      id: "b7312e29-8f2c-4f98-9337-f12a1d9c5de7",
      firstName: "Jane",
      middleName: null,
      lastName: "Smith",
      email: "janesmith@gmail.com",
      phone: "+61423456789",
      address: "456 Oak Avenue, Melbourne, VIC, Australia",
      passportNumber: "N7654321",
      currentVisa: "SUB_189",
      visaExpiry: new Date("2026-03-15T00:00:00Z"),
      createdAt: new Date("2024-12-01T12:00:00Z"),
      updatedAt: new Date("2024-12-01T12:00:00Z"),
    },
    {
      id: "a49e8f7c-cdf9-4a64-b3f7-d43db8df3e78",
      firstName: "Arjun",
      middleName: null,
      lastName: "Tamang",
      email: "arjun.t@gmail.com",
      phone: "+61498765432",
      address: "789 Willow Road, Brisbane, QLD, Australia",
      passportNumber: null,
      currentVisa: "SUB_190",
      visaExpiry: new Date("2024-12-31T00:00:00Z"),
      createdAt: new Date("2024-11-15T12:00:00Z"),
      updatedAt: new Date("2024-11-15T12:00:00Z"),
    },
    {
      id: "ea91d45b-2f47-43d9-b761-7c9b929c529a",
      firstName: "Maria",
      middleName: "Isabel",
      lastName: "Gonzalez",
      email: "maria.g@gmail.com",
      phone: "+61423412345",
      address: "55 Pine Lane, Adelaide, SA, Australia",
      passportNumber: "P9876543",
      currentVisa: "SUB_407",
      visaExpiry: new Date("2027-06-01T00:00:00Z"),
      createdAt: new Date("2024-10-05T12:00:00Z"),
      updatedAt: new Date("2024-10-05T12:00:00Z"),
    },
    {
      id: "37b929b3-c924-4d4f-8b29-e1fc1d6c5e2e",
      firstName: "Liam",
      middleName: "James",
      lastName: "Anderson",
      email: "liam.anderson@gmail.com",
      phone: "+61433211234",
      address: "89 Maple Crescent, Perth, WA, Australia",
      passportNumber: "A9876543",
      currentVisa: "SUB_482",
      visaExpiry: null,
      createdAt: new Date("2024-09-01T12:00:00Z"),
      updatedAt: new Date("2024-09-01T12:00:00Z"),
    },
    {
      id: "513a8284-bc11-478f-82a8-d5e0a8c2c6bc",
      firstName: "Aakriti",
      middleName: "B.",
      lastName: "Bhushal",
      email: "aakriti.b@gmail.com",
      phone: "+61490876543",
      address: "22 Birch Boulevard, Canberra, ACT, Australia",
      passportNumber: "D4321987",
      currentVisa: "SUB_482",
      visaExpiry: new Date("2026-07-20T00:00:00Z"),
      createdAt: new Date("2024-08-10T12:00:00Z"),
      updatedAt: new Date("2024-08-10T12:00:00Z"),
    },
    {
      id: "a49e8f7c-cdf9-4a64-b3f7-d43db8df3e78",
      firstName: "Arjun",
      middleName: null,
      lastName: "Tamang",
      email: "arjun.t@gmail.com",
      phone: "+61498765432",
      address: "789 Willow Road, Brisbane, QLD, Australia",
      passportNumber: null,
      currentVisa: "SUB_600",
      visaExpiry: new Date("2024-12-31T00:00:00Z"),
      createdAt: new Date("2024-11-15T12:00:00Z"),
      updatedAt: new Date("2024-11-15T12:00:00Z"),
    },
    {
      id: "e13bdc8b-58b1-4e9a-a8fa-7e0d5e55633e",
      firstName: "John",
      middleName: "Michael",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      phone: "+61412345678",
      address: "123 Elm Street, Sydney, NSW, Australia",
      passportNumber: "M1234567",
      currentVisa: "SUB_500",
      visaExpiry: new Date("2025-12-01T00:00:00Z"),
      createdAt: new Date("2024-12-01T12:00:00Z"),
      updatedAt: new Date("2024-12-01T12:00:00Z"),
    },
    {
      id: "b7312e29-8f2c-4f98-9337-f12a1d9c5de7",
      firstName: "Jane",
      middleName: null,
      lastName: "Smith",
      email: "janesmith@gmail.com",
      phone: "+61423456789",
      address: "456 Oak Avenue, Melbourne, VIC, Australia",
      passportNumber: "N7654321",
      currentVisa: "SUB_482",
      visaExpiry: new Date("2026-03-15T00:00:00Z"),
      createdAt: new Date("2024-12-01T12:00:00Z"),
      updatedAt: new Date("2024-12-01T12:00:00Z"),
    },
    {
      id: "a49e8f7c-cdf9-4a64-b3f7-d43db8df3e78",
      firstName: "Arjun",
      middleName: null,
      lastName: "Tamang",
      email: "arjun.t@gmail.com",
      phone: "+61498765432",
      address: "789 Willow Road, Brisbane, QLD, Australia",
      passportNumber: null,
      currentVisa: "SUB_407",
      visaExpiry: new Date("2024-12-31T00:00:00Z"),
      createdAt: new Date("2024-11-15T12:00:00Z"),
      updatedAt: new Date("2024-11-15T12:00:00Z"),
    },
    {
      id: "ea91d45b-2f47-43d9-b761-7c9b929c529a",
      firstName: "Maria",
      middleName: "Isabel",
      lastName: "Gonzalez",
      email: "maria.g@gmail.com",
      phone: "+61423412345",
      address: "55 Pine Lane, Adelaide, SA, Australia",
      passportNumber: "P9876543",
      currentVisa: "SUB_186",
      visaExpiry: new Date("2027-06-01T00:00:00Z"),
      createdAt: new Date("2024-10-05T12:00:00Z"),
      updatedAt: new Date("2024-10-05T12:00:00Z"),
    },
    // ...
  ];
}
export default withServerAuth(async function Clients() {
  const data = await getData();
  return (
    <div>
      <PageHeaderWithoutForm
        description="View contact information of all associated clients"
        header="Clients"
        pagePath="clients/create"
        buttonText="Register New Client"
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
        <DisplayCard
          description={` +2% form previous week`}
          icon={Calendar}
          title="Total Clients"
          digit={23}
        />
        <DisplayCard
          description="+5% form last Month"
          icon={Calendar}
          title="This Month"
          digit={23}
        />
        <DisplayCard
          description="-5% from last week"
          icon={Calendar}
          title="This week"
          digit={23}
        />
        <DisplayCard
          description="-3% from yesterday"
          icon={Calendar}
          title="Today"
          digit={23}
        />
      </div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
});
