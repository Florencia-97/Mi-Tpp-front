import {Endpoint} from "@eryxcoop/appyx-comm";
import IdeasListResponse from "../responses/IdeasListResponse";

export default class LoginEndpoint extends Endpoint {
    url() {
        return 'login'
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