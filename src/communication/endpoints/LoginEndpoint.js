import {Endpoint} from "@eryxcoop/appyx-comm";
import LoginResponse from "../responses/LoginResponse";

export default class LoginEndpoint extends Endpoint {
    url() {
        return 'users/login'
    }

    method() {
        return this.constructor.postMethod()
    }

    ownResponses() {
        return [LoginResponse];
    }

    needsAuthorization() {
        return false;
    }
}