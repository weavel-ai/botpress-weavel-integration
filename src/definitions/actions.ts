import { IntegrationDefinitionProps } from "@botpress/sdk";
import z from "zod";

const captureTrackEvent = {
  title: "Log track event",
  description: "Log an track event to Weavel",
  input: {
    schema: z.object({
      name: z
        .string()
        .describe(
          'Name of the track event (e.g. "Clicked on Purchase Button")'
        ),
      traceId: z
        .string()
        .describe("The Botpress conversation ID to assign to the track event"),
      properties: z
        .string()
        .optional()
        .describe(
          "Additional properties of the track event (MUST be a JSON string)"
        ),
    }),
    ui: {},
  },
  output: {
    schema: z.object({
      success: z.boolean(),
    }),
  },
};

const identifyUser = {
  title: "Identify user",
  description: "Identify user properties to Weavel",
  input: {
    schema: z.object({
      userId: z.string().describe("The user ID to identify"),
      name: z.string().optional().describe("Name of the user"),
      email: z.string().email().optional().describe("Email of the user"),
      properties: z
        .record(z.string(), z.any())
        .optional()
        .describe("Additional user properties (MUST be a JSON string)"),
    }),
  },
  output: {
    schema: z.object({
      success: z.boolean(),
    }),
  },
};

// const openTrace = {
//   title: 'Open trace',
//   description: 'Open a trace',
//   input: {
//     schema: z.object({
//       conversationId: z.string().describe('The Botpress conversation ID to assign to the trace'),
//       metadata: z.string().optional().describe('JSON string for metadata of the trace'),
//     }),
//   },
//   output: {
//     schema: z.object({
//       success: z.boolean(),
//     }),
//   },
// }

// const captureTraceData = {
//   title: "Log trace data",
//   description: "Log trace data (user message / assistant message)",
//   input: {
//     schema: z.object({
//       conversationId: z
//         .string()
//         .describe("The Botpress conversation ID to assign to the trace"),
//       role: z.string().describe('Role of sender ("user" | "assistant")'),
//       content: z
//         .string()
//         .describe('Content of the message (e.g. "Hello, how are you?")'),
//       metadata: z.string().optional().describe("Metadata of the message"),
//     }),
//   },
//   output: {
//     schema: z.object({
//       success: z.boolean(),
//     }),
//   },
// };

export const actions = {
  captureTrackEvent,
  identifyUser,
} satisfies IntegrationDefinitionProps["actions"];
