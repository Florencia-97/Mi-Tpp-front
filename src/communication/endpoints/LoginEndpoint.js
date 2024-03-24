import {Endpoint} from "@eryxcoop/appyx-comm";
import AccessResponse from "../responses/AccessResponse";

export default class LoginEndpoint extends Endpoint {
    url() {
        return 'users/login'
    }

    method() {
        return this.constructor.postMethod()
    }

    ownResponses() {
        return [AccessResponse];
    }

    needsAuthorization() {
        return false;
    }
}