import {Endpoint} from "@eryxcoop/appyx-comm";
import IdeasListResponse from "../responses/IdeasListResponse";

export default class DeleteIdeaEndpoint extends Endpoint {
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