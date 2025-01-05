import PageHeaderWithForm from "@/components/headers/page-header-with-form";
import { withServerAuth } from "@/lib/protected-server-pages";

export default withServerAuth(async function OfficeVisits() {
  return (
    <div>
      <PageHeaderWithForm
        description="Book or assign appointments"
        header="Office Visits"
        formType="OFFFICE_VISIT"
        buttonText="New Office Visit"
      />
    </div>
  );
});
