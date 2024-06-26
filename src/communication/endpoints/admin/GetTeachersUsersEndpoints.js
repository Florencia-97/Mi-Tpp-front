import {Endpoint} from "@eryxcoop/appyx-comm";
import UsersListResponse from "../../responses/UsersListResponse";

export default class GetTeachersUsersEndpoints extends Endpoint {
    url() {
        return 'admin/professors'
    }

    method() {
        return this.constructor.getMethod();
    }

    ownResponses() {
        return [UsersListResponse];
    }

    needsAuthorization() {
        return true;
    }
}