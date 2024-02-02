import {Endpoint} from "@eryxcoop/appyx-comm";
import IdeasListResponse from "../responses/IdeasListResponse";

export default class RegisterEndpoint extends Endpoint {
    url() {
        return 'register'
    }

    method() {
        this.constructor.postMethod()
    }

    ownResponses() {
        return [IdeasListResponse];
    }

    needsAuthorization() {
        return false;
    }
}