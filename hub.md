This integration allows you to connect your Botpress chatbot with Weavel, a powerful analytics platform for conversational AI. By integrating your chatbot with Weavel, your chatbot's conversations will be automatically captured and analyzed with Weavel's AI, and configurable reports will be generated automatically to help you understand your chatbot's performance and user behavior.

You can also set up the integration from Weavel, to set up a scheduled data pull from Botpress to Weavel.

## Prerequisites

To establish this integration, the following is required:

- Authorized access to an existing Weavel project. If you don't have an existing account, you can sign up for free [here](https://weavel.ai).
- A valid Weavel project API key.

After the setup, you should follow the instructions below to ensure all of your chatbot's conversation data is properly captured by Weavel.

You can also follow an interactive guide to set up the integration [here](https://weavel.ai/docs/platform-integrations/botpress#log-data-from-botpress-studio).

## Setup realtime message logging

Before activating the Botpress Weavel Integration, please walk through the following steps:

### First, add the Weavel API key to your bot's configuration.

Add your Weavel project API key to your chatbot's configuration variables. This is required to make it accessible to the hooks you will add in the next step.

![Bot configuration](https://i.imgur.com/sDnhkz4.png)

### Second, add two hooks into your chatbot.

> **Note:** You can add hooks in the "Hooks" section of your chatbot's admin panel.
> ![Hooks section of admin panel](https://i.imgur.com/cNzPNyJ.png)

Create a new hook under the "After Incoming Message" section, and add the following code:

```typescript
try {
  const userMessage = event.preview;
  const incomingMessageId = event.id;
  workflow.incomingMessageId = incomingMessageId;
  await axios.post(
    "https://api.weavel.ai/capture/trace_data",
    {
      trace_id: event.conversationId,
      trace_data_id: incomingMessageId,
      user_id: event.userId,
      role: "user",
      content: userMessage,
      metadata: {
        // Add any additional metadata you want to capture (for all messages) here.
        // To capture metadata for specific messages, use the "Log message metadata" card in the studio.
      },
    },
    {
      headers: {
        Authorization: `Bearer ${event.state.configVariables?.["weavelApiKey"]}`,
      },
    }
  );
} catch (error) {
  console.log(error);
}
```

Next, create another hook under the "Before Outgoing Message" section, and add the following code:

```typescript
try {
  let assistantMessage: string;
  if (outgoingEvent.payload.type == "text") {
    assistantMessage = outgoingEvent.preview;
  } else {
    assistantMessage = `${outgoingEvent.payload.type}: ${JSON.stringify(
      outgoingEvent.payload
    )}`;
  }
  const outgoingMessageId = outgoingEvent.id;
  workflow.outgoingMessageId = outgoingMessageId;
  const data = {
    trace_id: event.conversationId,
    trace_data_id: outgoingMessageId,
    user_id: event.userId,
    role: "assistant",
    content: assistantMessage,
    metadata: {
      // Add any additional metadata you want to capture (for all messages) here.
      // To capture metadata for specific messages, use the "Log message metadata" card in the studio.
    },
  };
  await axios.post("https://api.weavel.ai/capture/trace_data", data, {
    headers: {
      Authorization: `Bearer ${event.state.configVariables?.["weavelApiKey"]}`,
    },
  });
} catch (error) {
  console.log(error);
}
```

## Advanced Usage

### Identify users

You can use this function to identify users in Weavel. This will populate the user's profile in Weavel with the provided user id, name, email, and other details.

### Log track event

You can use this function to log track events to Weavel. This is useful for tracking user interactions and events in your bot, such as button clicks, successful form submissions, and other custom events.

### Log message metadata

Use this function to log metadata for specific messages. This is useful for capturing additional context for specific messages, such as user feedback score, details for AI generated messages (knowledge base, AI model, etc.), etc.

#### Some additional setup is required for this action card to work:

1. Add four workflow variables to your bot: `incomingMessageId`, `outgoingMessageId`, `messageId`, and `metadata`. If you have copied the hooks from the previous section, you will see that these variables are used to store the message ids for incoming and outgoing messages.

2. Just after the card that sends/receives the message where you want to log metadata to, add an **Execute code** action card to set the `messageId` variable. Copy one of the following code snippets into the card:

```typescript
// If you want to log the user's message
workflow.messageId = workflow.incomingMessageId;
```

```typescript
// If you want to log the assistant's message
workflow.messageId = workflow.outgoingMessageId;
```

3. Before the **Log Message Metadata** action card, add an **Execute code** action card to declare the metadata as a JSON string. Refer to the example below:

```typescript
workflow.metadata = JSON.stringify({
  feedbackScore: 5,
  model: "gpt-3.5-turbo",
});
```

## Learn more

With the integration enabled, Weavel will analyze your chatbot's conversations and generate reports to help you understand your chatbot's performance and user behavior. To learn more about Weavel's capabilities and how to use the reports, refer to the [Weavel documentation](https://weavel.ai/docs).
