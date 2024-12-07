import {
    ArrowDown,
    ArrowRight,
    ArrowUp,
    CheckCircle,
    Circle,
    CircleOff,
    HelpCircle,
    Timer,
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
  
  // export const visas = visaTypeEnum.enumValues.map((type) => ({
  //   value: type,
  //   label: type.split("_") 
  //   .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
  //   .join(" "),
  //   icon: HelpCircle, // Replace with any icon you prefer
  // }));

  export const visas = [
    {
      value: "SUB_500",
      label: "SUB_500",
      icon: HelpCircle,
    },
    {
      value: "SUB_482",
      label: "SUB_482",
      icon: Circle,
    },
    {
      value: "SUB_186",
      label: "SUB_186",
      icon: Timer,
    },
    {
      value: "SUB_189",
      label: "SUB_189",
      icon: CheckCircle,
    },
    {
      value: "SUB_190",
      label: "SUB_190",
      icon: CircleOff,
    },
  ]
  
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