import {Endpoint} from "@eryxcoop/appyx-comm";
import IdeasListResponse from "../../responses/IdeasListResponse";

export default class IdeasEndpoint extends Endpoint {
    url() {
        return 'ideas'
    }

    method() {
        return this.constructor.getMethod()
    }

    ownResponses() {
        return [IdeasListResponse];
    }

    needsAuthorization() {
        return true;
    }
}