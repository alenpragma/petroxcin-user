import { z } from "zod";

export const supportTicketSchema = z.object({
  subject: z.string().nonempty({ message: "Enter your subject" }),
  message: z.string().nonempty({ message: "Enter your message" }),
  images: z.instanceof(File).optional(),
});
