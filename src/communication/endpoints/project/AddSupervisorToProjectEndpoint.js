import {Endpoint, SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class UpdateSupervisorOfProjectEndpoint extends Endpoint {
  constructor(projectId) {
    super();
    this._projectId = projectId;
  }

  url() {
    return 'projects/' + this._projectId + '/supervisor';
  }

  method() {
    return this.constructor.postMethod();
  }

  ownResponses() {
    return [SuccessfulApiResponse];
  }

  needsAuthorization() {
    return true;
  }
}