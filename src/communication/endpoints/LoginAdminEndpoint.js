import {Endpoint} from "@eryxcoop/appyx-comm";
import AccessResponse from "../responses/AccessResponse";

export default class LoginAdminEndpoint extends Endpoint {
  url() {
    return 'users/admin/login'
  }

  method() {
    return this.constructor.postMethod();
  }

  ownResponses() {
    return [AccessResponse];
  }

  needsAuthorization() {
    return false;
  }
}