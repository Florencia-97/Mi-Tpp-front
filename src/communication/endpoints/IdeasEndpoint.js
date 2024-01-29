import {Endpoint} from "@eryxcoop/appyx-comm";
import IdeasListResponse from "../responses/IdeasListResponse";

export default class IdeasEndpoint extends Endpoint {
    url() {
        return 'ideas/'
    }

    method() {
        this.constructor.getMethod()
    }

    ownResponses() {
        return [IdeasListResponse];
    }

    needsAuthorization() {
        return false; // for now
    }
}