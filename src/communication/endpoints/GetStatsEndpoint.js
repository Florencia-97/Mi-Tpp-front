import {Endpoint} from "@eryxcoop/appyx-comm";
import StatsResponse from "../responses/StatsResponse";

export default class GetStatsEndpoint extends Endpoint {


  url() {
    return 'metrics';
  }

  method() {
    return this.constructor.getMethod();
  }

  ownResponses() {
    return [StatsResponse];
  }

  needsAuthorization() {
    return true;
  }
}