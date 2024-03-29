import {Endpoint, SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class ApproveTeacherUserEndpoints extends Endpoint {

  url() {
    return 'admin/add_teacher'
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