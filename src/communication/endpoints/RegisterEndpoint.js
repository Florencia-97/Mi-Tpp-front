import {Endpoint} from "@eryxcoop/appyx-comm";
import AccessResponse from "../responses/AccessResponse";

export default class RegisterEndpoint extends Endpoint {
    url() {
        return 'users/register'
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