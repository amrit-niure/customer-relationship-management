import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ClientWelcomeEmailProps {
  userFirstname: string;
}

export const ClientWelcomeEmail = ({
  userFirstname,
}: ClientWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Applyworld Group - Your Trusted Migration Partner</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://lucia-2.vercel.app/_next/image?url=%2Four-company.png&w=128&q=75"
          width="128"
          height="75"
          alt="Applyworld"
          style={logo}
        />
        <Heading style={h1}>Welcome to Apply World Group</Heading>
        <Text style={paragraph}>Hello {userFirstname},</Text>
        <Text style={paragraph}>
          We’re delighted to have you with us at Applyworld Group. As trusted
          visa, migration, and education agents in Australia, we are committed
          to supporting you on your journey.
        </Text>
        <Text style={paragraph}>
          Whether you're planning to study, migrate, or explore opportunities
          in Australia, our team is here to guide you every step of the way.
        </Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href="https://applyworldgroup.com.au"
          >
            Visit Our Website
          </Button>
        </Section>
        <Text style={paragraph}>
          Have any questions? Reach out to our team at{" "}
          <Link href="mailto:info@applyworldgroup.com.au" style={link}>
            info@applyworldgroup.com.au
          </Link>{" "}
          or call us at +61 291362399.
        </Text>
        <Hr style={hr} />
        <Text style={paragraph}>
          Thank you for choosing Applyworld Group. We look forward to being a
          part of your success story.
        </Text>
        <Text style={paragraph}>
          Best regards,
          <br />
          The Applyworld Group Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          © 2024 Applyworld Group | Suite 55 L5 104 Bathurst St, Sydney, NSW
          2000, Australia
        </Text>
      </Container>
    </Body>
  </Html>
);

ClientWelcomeEmail.PreviewProps = {
  userFirstname: "John",
} as ClientWelcomeEmailProps;

export default ClientWelcomeEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  borderRadius: "4px",
  maxWidth: "600px",
};

const logo = {
  margin: "0 auto 20px",
};

const h1 = {
  color: "#1e1e1e",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.4",
  textAlign: "center" as const,
  margin: "30px 0",
};

const paragraph = {
  color: "#484848",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "16px 0",
};

const btnContainer = {
  textAlign: "center" as const,
  marginTop: "32px",
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  transition: "background-color 0.3s ease",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "32px 0",
};

const link = {
  color: "#5F51E8",
  textDecoration: "underline",
};

const footer = {
  color: "#9ca299",
  fontSize: "14px",
  textAlign: "center" as const,
  marginTop: "32px",
};
