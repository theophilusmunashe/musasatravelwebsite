import type { BookingIntent } from "@/lib/estate-tokens";
import type { BookingLane, BookingStep, FormState } from "@/lib/booking-flow";
import type { SahwiraMessage } from "@/lib/sahwira";

export type BookingExperienceProps = {
  mode: BookingLane;
  intent: BookingIntent;
  step: number;
  steps: BookingStep[];
  form: FormState;
  messages: SahwiraMessage[];
  chatLoading: boolean;
  chatStreaming: string | null;
  done: boolean;
  submitting: boolean;
  reference: string;
  summary: string[];
  embedded?: boolean;
  setField: (field: keyof FormState, value: string) => void;
  switchIntent: (intent: BookingIntent) => void;
  goBack: () => void;
  goNext: () => void;
  submit: () => void;
  sendMessage: (text: string) => void;
  setMode: (mode: BookingLane) => void;
};
