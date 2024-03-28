import {Endpoint} from "@eryxcoop/appyx-comm";
import TeacherProjectsResponse from "../../responses/TeacherProjectsResponse";
import {SimpleErrorResponse} from "@eryxcoop/appyx-comm/src/responses/generalResponses/SimpleErrorResponse";

export default class GetProjectsEndpoint extends Endpoint {

  url() {
    return 'projects';
  }

  method() {
    return this.constructor.getMethod();
  }

  ownResponses() {
    return [TeacherProjectsResponse, SimpleErrorResponse];
  }

  needsAuthorization() {
    return true;
  }
}