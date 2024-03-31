import {Endpoint} from "@eryxcoop/appyx-comm";
import AccessResponse from "../responses/AccessResponse";

export default class AccessEndpoint extends Endpoint {
    url() {
        return 'users/access'
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