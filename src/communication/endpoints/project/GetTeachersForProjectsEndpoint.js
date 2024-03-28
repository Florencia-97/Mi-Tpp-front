import {Endpoint} from "@eryxcoop/appyx-comm";
import StudentsResponse from "../../responses/StudentsResponse";

export default class GetTeachersForProjectsEndpoint extends Endpoint {

  url() {
    return 'users/professors';
  }

  method() {
    return this.constructor.getMethod();
  }

  ownResponses() {
    return [StudentsResponse];
  }

  needsAuthorization() {
    return true;
  }
}