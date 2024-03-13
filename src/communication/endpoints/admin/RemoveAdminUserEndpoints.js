import {Endpoint, SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class RemoveAdminUserEndpoints extends Endpoint {

    constructor(email) {
        super();
        this._email = email;
    }

    url() {
        return 'admin/admin/' + this._email
    }

    method() {
        return "DELETE"
    }

    ownResponses() {
        return [SuccessfulApiResponse];
    }

    needsAuthorization() {
        return true;
    }
}