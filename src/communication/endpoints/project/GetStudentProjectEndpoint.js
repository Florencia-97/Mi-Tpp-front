import {Endpoint} from "@eryxcoop/appyx-comm";
import ProjectResponse from "../../responses/ProjectResponse";

export default class GetStudentProjectEndpoint extends Endpoint {

  url() {
    return 'projects/user'
  }

  method() {
    return this.constructor.getMethod();
  }

  ownResponses() {
    return [ProjectResponse];
  }

  needsAuthorization() {
    return true;
  }
}