import {Endpoint} from "@eryxcoop/appyx-comm";
import RegisterResponse from "../responses/RegisterResponse";

export default class RegisterEndpoint extends Endpoint {
    url() {
        return 'users/register'
    }

    method() {
        return this.constructor.postMethod()
    }

    ownResponses() {
        return [RegisterResponse];
    }

    needsAuthorization() {
        return false;
    }
}