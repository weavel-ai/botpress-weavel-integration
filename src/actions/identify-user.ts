import { getClient } from "src/client";
import { IdentifyUserRequest } from "../client/types";
import { identifyUserInputSchema } from "src/misc/schemas";
import type { Implementation } from "../misc/types";

export const identifyUser: Implementation["actions"]["identifyUser"] = async ({
  ctx,
  input,
  logger,
}) => {
  const validatedInput = identifyUserInputSchema.parse(input);
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

  const data: IdentifyUserRequest = {
    user_id: validatedInput.userId,
    properties: {
      ...properties,
      name: validatedInput.name,
      email: validatedInput.email,
    },
  };
  let success = false;
  try {
    await weavelClient.identifyUser(data);
    success = true;
    logger.forBot().info("Successful - Identify user");
  } catch (error) {
    logger.forBot().debug(`'Identify user' exception ${JSON.stringify(error)}`);
  }
  return {
    success,
  };
};
