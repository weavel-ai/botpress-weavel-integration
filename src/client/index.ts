import axios, { AxiosInstance } from "axios";
import { CaptureTrackEventRequest, IdentifyUserRequest } from "./types";

export class WeavelAPI {
  private client: AxiosInstance;

  constructor(apiToken: string) {
    this.client = axios.create({
      baseURL: "https://api.weavel.ai",
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
  }

  async captureTrackEvent(data: CaptureTrackEventRequest): Promise<void> {
    await this.client.post("/capture/track_event", data);
  }

  async identifyUser(data: IdentifyUserRequest): Promise<void> {
    await this.client.post("/identify_user", data);
  }

  // async openTrace(data: OpenTraceRequest): Promise<void> {
  //   await this.client.post("/open_trace", data);
  // }

  // async captureTraceData(data: CaptureTraceDataRequest): Promise<void> {
  //   await this.client.post("/capture/trace_data", data);
  // }
}

export const getClient = (apiKey: string) => new WeavelAPI(apiKey);
