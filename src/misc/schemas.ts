import z from "zod";

export const logTrackEventInputSchema = z.object({
  userId: z.string(),
  traceId: z.string(),
  name: z.string(),
  properties: z.string().optional(),
});

export const identifyUserInputSchema = z.object({
  userId: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  properties: z.string().optional(),
});

export const logMessageMetadataSchema = z.object({
  messageId: z.string(),
  metadata: z.string(),
});

// export const openTraceInputSchema = z.object({
//   conversationId: z.string(),
//   metadata: z.string().optional(),
// });

// export const captureTraceDataInputSchema = z.object({
//   conversationId: z.string(),
//   type: z.enum(["user", "assistant"]),
//   content: z.string(),
//   metadata: z.string().optional(),
// });
