import {Endpoint} from "@eryxcoop/appyx-comm";
import BinnacleEntriesResponse from "../../responses/BinnacleEntriesResponse";

export default class GetBinnacleEntriesEndpoint extends Endpoint {

  constructor(projectId) {
    super();
    this._projectId = projectId;
  }

  url() {
    return 'projects/' + this._projectId + '/binnacle'
  }

  method() {
    return this.constructor.getMethod();
  }

  ownResponses() {
    return [BinnacleEntriesResponse];
  }

  needsAuthorization() {
    return true;
  }
}