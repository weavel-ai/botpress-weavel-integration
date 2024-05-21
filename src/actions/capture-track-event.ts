import { getClient } from "src/client";
import { CaptureTrackEventRequest } from "src/client/types";
import { captureTrackEventInputSchema } from "src/misc/schemas";
import type { Implementation } from "../misc/types";

export const captureTrackEvent: Implementation["actions"]["captureTrackEvent"] =
  async ({ ctx, input, logger }) => {
    const validatedInput = captureTrackEventInputSchema.parse(input);
    const weavelClient = getClient(ctx.configuration.apiKey);
    let properties = {};

    if (validatedInput.properties) {
      try {
        properties = JSON.parse(validatedInput.properties);
      } catch (error) {
        logger
          .forBot()
          .debug(`'Identify user' exception ${JSON.stringify(error)}`);
      }
    }

    const data: CaptureTrackEventRequest = {
      user_id: ctx.botUserId,
      trace_id: validatedInput.traceId,
      name: validatedInput.name,
      properties: properties,
    };
    let success = false;
    try {
      await weavelClient.captureTrackEvent(data);
      success = true;
      logger.forBot().info("Successful - Capture track event");
    } catch (error) {
      logger
        .forBot()
        .debug(`'Capture track event' exception ${JSON.stringify(error)}`);
    }
    return {
      success,
    };
  };
