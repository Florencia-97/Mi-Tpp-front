import {Endpoint} from "@eryxcoop/appyx-comm";
import IdeasListResponse from "../../responses/IdeasListResponse";

export default class CreateIdeaEndpoint extends Endpoint {
    url() {
        return 'ideas'
    }

    method() {
        return this.constructor.postMethod();
    }

    ownResponses() {
        return [IdeasListResponse];
    }

    needsAuthorization() {
        return true;
    }
}