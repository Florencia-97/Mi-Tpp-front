import {Endpoint} from "@eryxcoop/appyx-comm";
import ProjectResponse from "../../responses/ProjectResponse";

export default class GetPublishedProjectEndpoint extends Endpoint {

  constructor(projectId) {
    super();
    this._projectId = projectId;
  }

  url() {
    return 'projects/published/' + this._projectId;
  }

  method() {
    return this.constructor.getMethod();
  }

  ownResponses() {
    return [ProjectResponse];
  }

  needsAuthorization() {
    return false;
  }
}