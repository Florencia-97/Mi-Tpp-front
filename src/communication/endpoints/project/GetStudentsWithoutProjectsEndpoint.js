import {Endpoint} from "@eryxcoop/appyx-comm";
import UsersResponse from "../../responses/UsersResponse";

export default class GetStudentsWithoutProjectsEndpoint extends Endpoint {

  url() {
    return 'users/students';
  }

  method() {
    return this.constructor.getMethod();
  }

  ownResponses() {
    return [UsersResponse];
  }

  needsAuthorization() {
    return true;
  }
}