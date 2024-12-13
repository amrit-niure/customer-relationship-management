import React from "react";
import {CircleCheckBig } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TimelineItemProps {
  date: string;
  time: string;
  title: string;
  description?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  time,
  title,
  description,
}) => {
  return (
    <div className="relative flex items-start space-x-4  pb-4 ">
      <div className="flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
          <CircleCheckBig className="h-4 w-4" />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {title}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {date} at {time}
        </p>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

interface TimelineProps {
  items: TimelineItemProps[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>
      <CardContent>

          <div className="space-y-4">
            {items.map((item, index) => (
              <TimelineItem
                key={index}
                date={item.date}
                time={item.time}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
      </CardContent>
    </Card>
  );
};

export default Timeline;
