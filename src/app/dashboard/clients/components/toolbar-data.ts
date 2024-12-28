import { visaTypeEnum } from "@/db/schema/enums";
import {
    ArrowDown,
    ArrowRight,
    ArrowUp,
    HelpCircle,
  } from "lucide-react"
  
  export const labels = [
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ]
  
  export const visas = visaTypeEnum.enumValues.map((type) => ({
    value: type,
    label: type.split("_") 
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(" "),
    icon: HelpCircle, // Replace with any icon you prefer
  }));

  export const priorities = [
    {
      label: "Low",
      value: "low",
      icon: ArrowDown,
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRight,
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUp,
    },
  ]