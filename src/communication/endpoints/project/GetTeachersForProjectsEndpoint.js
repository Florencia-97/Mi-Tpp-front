import {Endpoint} from "@eryxcoop/appyx-comm";
import UsersResponse from "../../responses/UsersResponse";

export default class GetTeachersForProjectsEndpoint extends Endpoint {

  url() {
    return 'users/professors-for-project';
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