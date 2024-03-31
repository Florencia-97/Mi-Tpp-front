import {Endpoint} from "@eryxcoop/appyx-comm";
import IdeasListResponse from "../../responses/IdeasListResponse";

export default class PublishedIdeasEndpoint extends Endpoint {
  url() {
    return 'ideas/published'
  }

  method() {
    return this.constructor.getMethod()
  }

  ownResponses() {
    return [IdeasListResponse];
  }

  needsAuthorization() {
    return true;
  }
}