import {Endpoint, SuccessfulApiResponse} from "@eryxcoop/appyx-comm";
import UsersListResponse from "../../responses/UsersListResponse";

export default class AddAdminUserEndpoints extends Endpoint {
    url() {
        return 'admin/add_admin'
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