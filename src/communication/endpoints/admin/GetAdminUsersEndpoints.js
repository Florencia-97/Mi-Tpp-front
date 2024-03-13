import {Endpoint} from "@eryxcoop/appyx-comm";
import UsersListResponse from "../../responses/UsersListResponse";

export default class GetAdminUsersEndpoints extends Endpoint {
    url() {
        return 'admin/admin'
    }

    method() {
        return this.constructor.getMethod()
    }

    ownResponses() {
        return [UsersListResponse];
    }

    needsAuthorization() {
        return true;
    }
}