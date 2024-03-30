import {Endpoint} from "@eryxcoop/appyx-comm";
import ProjectResponse from "../../responses/ProjectResponse";

export default class GetAllPublishedProjectsEndpoint extends Endpoint {


  url() {
    return 'projects/published';
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