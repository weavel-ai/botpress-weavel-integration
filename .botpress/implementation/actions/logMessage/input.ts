/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type TheBotpressConversationIDToAssignToTheMessage = string;
export type TypeOfMessageUserAssistant = "user" | "assistant";
export type ContentOfTheMessageEGHelloHowAreYou = string;

export interface Input {
  conversationId: TheBotpressConversationIDToAssignToTheMessage;
  type: TypeOfMessageUserAssistant;
  content: ContentOfTheMessageEGHelloHowAreYou;
  metadata: OptionalMetadataOfTheMessageIncludeAnyDataYouWantToAssociateWithTheMessageEGUserId1234;
}
export interface OptionalMetadataOfTheMessageIncludeAnyDataYouWantToAssociateWithTheMessageEGUserId1234 {
  [k: string]: any;
}
