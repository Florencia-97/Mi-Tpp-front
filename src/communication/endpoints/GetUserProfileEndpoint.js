import {Endpoint} from "@eryxcoop/appyx-comm";
import UserResponse from "../responses/UserResponse";

export default class GetUserProfileEndpoint extends Endpoint {

    constructor(email) {
        super();
        this._email = email;
    }

    url() {
        return '/users/' + this._email;
    }

    method() {
        return this.constructor.getMethod();
    }

    ownResponses() {
        return [UserResponse];
    }

    needsAuthorization() {
        return true;
    }
}