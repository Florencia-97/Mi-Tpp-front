import {Endpoint} from "@eryxcoop/appyx-comm";
import UserResponse from "../responses/UserResponse";

export default class UpdateUserProfileEndpoint extends Endpoint {

    constructor(email) {
        super();
        this._email = email;
    }

    url() {
        return 'users/' + this._email
    }

    method() {
        return 'PUT';
    }

    ownResponses() {
        return [UserResponse];
    }

    needsAuthorization() {
        return true;
    }
}