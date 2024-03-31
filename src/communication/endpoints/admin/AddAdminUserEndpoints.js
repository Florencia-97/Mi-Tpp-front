import {Endpoint, SuccessfulApiResponse} from "@eryxcoop/appyx-comm";
import UsersListResponse from "../../responses/UsersListResponse";
import {SimpleErrorResponse} from "@eryxcoop/appyx-comm/src/responses/generalResponses/SimpleErrorResponse";

export default class AddAdminUserEndpoints extends Endpoint {
    url() {
        return 'admin/add_admin'
    }

    method() {
        return this.constructor.postMethod();
    }

    ownResponses() {
        return [SuccessfulApiResponse, SimpleErrorResponse];
    }

    needsAuthorization() {
        return true;
    }
}