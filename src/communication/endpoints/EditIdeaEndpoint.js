import {Endpoint} from "@eryxcoop/appyx-comm";
import IdeasListResponse from "../responses/IdeasListResponse";

export default class EditIdeaEndpoint extends Endpoint {
    url() {
        return 'ideas/'
    }

    method() {
        this.constructor.postMethod()
    }

    ownResponses() {
        return [IdeasListResponse];
    }

    needsAuthorization() {
        return true;
    }
}