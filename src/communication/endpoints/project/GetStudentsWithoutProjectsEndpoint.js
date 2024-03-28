import {Endpoint} from "@eryxcoop/appyx-comm";
import StudentsResponse from "../../responses/StudentsResponse";

export default class GetStudentsWithoutProjectsEndpoint extends Endpoint {

  url() {
    return 'users/students';
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