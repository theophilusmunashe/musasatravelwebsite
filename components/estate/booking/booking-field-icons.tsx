import type { BookingStep } from "@/lib/booking-flow";
import {
  Calendar,
  Mail,
  MessageSquare,
  Phone,
  Ticket,
  User,
  Users,
  Home,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";

export function iconForStep(step: BookingStep): ReactNode {
  const cls = "h-4 w-4";
  switch (step.field) {
    case "checkIn":
    case "checkOut":
    case "eventDate":
      return <Calendar className={cls} />;
    case "guests":
    case "headcount":
    case "tickets":
      return <Users className={cls} />;
    case "space":
      return <Home className={cls} />;
    case "eventType":
    case "event":
      return <Sparkles className={cls} />;
    case "firstName":
    case "lastName":
      return <User className={cls} />;
    case "email":
      return <Mail className={cls} />;
    case "phone":
      return <Phone className={cls} />;
    case "message":
      return <MessageSquare className={cls} />;
    default:
      return <Ticket className={cls} />;
  }
}

export function assistantPrompt(step: BookingStep, intentWord: string): string {
  switch (step.field) {
    case "checkIn":
      return "When would you like to arrive?";
    case "checkOut":
      return "And when are you planning to leave?";
    case "guests":
      return "How many guests will be joining you?";
    case "space":
      return intentWord === "host"
        ? "Which space feels right for your event?"
        : "How much space do you need?";
    case "eventDate":
      return intentWord === "host" ? "When is your event?" : "Do you have a preferred date in mind?";
    case "eventType":
      return "What kind of celebration are you planning?";
    case "headcount":
      return "Roughly how many guests are you expecting?";
    case "event":
      return "Which gathering would you like to join?";
    case "tickets":
      return "How many tickets do you need?";
    case "firstName":
      return "Let's start with your first name.";
    case "lastName":
      return "And your surname?";
    case "email":
      return "What's the best email to reach you?";
    case "phone":
      return "A phone number, in case we need to call?";
    case "message":
      return "Anything else you'd like us to know? (Optional)";
    default:
      return step.label;
  }
}
