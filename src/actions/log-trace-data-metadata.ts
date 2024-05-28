import { getClient } from "src/client";
import { CaptureTraceDataMetadataRequest } from "src/client/types";
import { logMessageMetadataSchema } from "src/misc/schemas";
import type { Implementation } from "../misc/types";

export const logMessageMetadata: Implementation["actions"]["logMessageMetadata"] =
  async ({ ctx, input, logger }) => {
    const validatedInput = logMessageMetadataSchema.parse(input);
    const weavelClient = getClient(ctx.configuration.apiKey);
    let metadata = {};

    if (validatedInput.metadata) {
      try {
        metadata = JSON.parse(validatedInput.metadata);
      } catch (error) {
        logger.forBot().debug(`'metadata' exception ${JSON.stringify(error)}`);
      }
    }

    let success = false;
    try {
      const data: CaptureTraceDataMetadataRequest = {
        trace_data_id: validatedInput.messageId,
        metadata,
      };
      await weavelClient.captureTraceDataMetadata(data);
      success = true;
      logger.forBot().info("Successful - Capture trace data metadata");
    } catch (error) {
      logger
        .forBot()
        .debug(
          `'Capture trace data metadata' exception ${JSON.stringify(error)}`
        );
    }
    return {
      success,
    };
  };
