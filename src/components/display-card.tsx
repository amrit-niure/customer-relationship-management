import { FC } from "react";import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface DisplayCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  digit: number;
}

const DisplayCard: FC<DisplayCardProps> = ({
  description,
  digit,
  icon: Icon,
  title,
}) => {
  return (
    <Card>
      <CardHeader className="flex w-full flex-row items-center justify-between space-y-0 pb-2 border-muted">
        <CardTitle className="text font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{digit}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default DisplayCard;
