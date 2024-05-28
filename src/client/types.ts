export type IdentifyUserRequest = {
  user_id: string;
  properties?: Record<string, any>;
};

export type CaptureTrackEventRequest = {
  user_id: string;
  trace_id: string;
  name: string;
  properties?: Record<string, any>;
  timestamp?: string;
};

export type ReadRecentTraceDataRequest = {
  user_id: string;
  role: "user" | "assistant";
};

export type ReadRecentTraceDataResponse = {
  trace_data_id: string;
  created_at: string;
};

export type CaptureTraceDataMetadataRequest = {
  trace_data_id: string;
  metadata: Record<string, any>;
};

// export type OpenTraceRequest = {
//   user_id: string;
//   trace_id: string;
//   metadata?: Record<string, any>;
//   timestamp?: string;
// };

// export type CaptureTraceDataRequest = {
//   user_id: string;
//   trace_id: string;
//   role: "user" | "assistant";
//   content: string;
//   unit_name?: string;
//   metadata?: Record<string, any>;
//   timestamp?: string;
// };
