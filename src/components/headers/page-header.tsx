import { FC } from "react";
import PageHeaderWithForm from "./page-header-with-form";
import PageHeaderWithoutForm from "./page-header-without-form";
interface PageHeaderProps {
  header: string;
  description: string;
  buttonText?: string;
  pagePath?: string;
  formType?: "TEAM" | "APPOINTMENT";
}

const PageHeader: FC<PageHeaderProps> = ({
  description,
  header,
  buttonText,
  formType,
  pagePath,
}) => {
  if (formType) {
    return (
      <PageHeaderWithForm
        buttonText={buttonText}
        description={description}
        formType={formType}
        header={header}
      />
    );
  } else {
    return (
      <PageHeaderWithoutForm
        description={description}
        header={header}
        pagePath={pagePath}
      />
    );
  }
};

export default PageHeader;
