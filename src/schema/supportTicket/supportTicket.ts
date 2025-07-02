import { z } from "zod";

export const supportTicketSchema = z.object({
    subject: z.string().nonempty({ message: "Enter your subject" }),
    priority: z.enum(["high", "medium", "low"], {
        required_error: "Select a priority",
    }),
    message: z.string().nonempty({ message: "Enter your message" }),
});
