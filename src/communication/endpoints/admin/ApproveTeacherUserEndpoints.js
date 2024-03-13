import {Endpoint, SuccessfulApiResponse} from "@eryxcoop/appyx-comm";
import UsersListResponse from "../../responses/UsersListResponse";

export default class ApproveTeacherUserEndpoints extends Endpoint {
    url() {
        return 'admin/admin'
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