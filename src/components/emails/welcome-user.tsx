import * as React from "react";import {  Body,  Button,  Container,
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

interface ApplyworldWelcomeEmailProps {
  userFirstname: string;
  email: string;
  password: string;
}

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "";

export const ApplyworldWelcomeEmail = ({
  userFirstname,
  email,
  password,
}: ApplyworldWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Welcome to Applyworld CRM - Your Gateway to Efficient Customer Management
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://lucia-2.vercel.app/_next/image?url=%2Four-company.png&w=128&q=75`}
          width="128"
          height="75"
          alt="Applyworld"
          style={logo}
        />
        <Heading style={h1}>Welcome to Applyworld CRM</Heading>
        <Text style={paragraph}>Hello {userFirstname},</Text>
        <Text style={paragraph}>
          We're thrilled to welcome you to Applyworld CRM, your new powerhouse
          for customer relationship management. Get ready to transform the way
          you interact with your clients and streamline your business processes.
        </Text>
        <Section style={titleContainer}>
          <Text style={title}>Your Login Credentials</Text>
        </Section>
        <Section style={cardWrapper}>
          <Text style={cardText}>
            <strong>Email:</strong> {email}
          </Text>
          <Text style={cardText}>
            <strong>Password:</strong> {password}
          </Text>
        </Section>
        {/* <Text style={paragraph}>
          For security reasons, we recommend changing your password upon your
          first login.
        </Text> */}
        <Section style={btnContainer}>
          <Button style={button} href="https://lucia-2.vercel.app">
            Log in to Applyworld CRM
          </Button>
        </Section>
        <Text style={paragraph}>
          Need help getting started? Our support team is always here to assist
          you. Reach out to our IT Administrator at{" "}
          <Link href="mailto:support@applyworldgroup.com.au" style={link}>
            amrit@applyworldgroup.com.au
          </Link>
          .
        </Text>
        <Hr style={hr} />
        <Text style={paragraph}>
          We're excited to be part of your journey towards more efficient and
          effective customer management.
        </Text>
        <Text style={paragraph}>
          Best regards,
          <br />
          The Applyworld Group Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          © 2023 Applyworld Group | Suite 55 L3 104 Bathurst St, Sydney, NSW
          2000, Australia
        </Text>
      </Container>
    </Body>
  </Html>
);

ApplyworldWelcomeEmail.PreviewProps = {
  userFirstname: "Alan",
  email: "alan@example.com",
  password: "WelcomeAlan123!",
} as ApplyworldWelcomeEmailProps;

export default ApplyworldWelcomeEmail;

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

const titleContainer = {
  marginTop: "32px",
};

const title = {
  color: "#1e1e1e",
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: "1.4",
  margin: "16px 0",
};

const cardWrapper = {
  backgroundColor: "#f6f9fc",
  borderRadius: "4px",
  padding: "24px",
  marginBottom: "24px",
};

const cardText = {
  color: "#484848",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "8px 0",
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
