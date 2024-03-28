import {Endpoint, SuccessfulApiResponse} from "@eryxcoop/appyx-comm";
import IdeasListResponse from "../../responses/IdeasListResponse";

export default class PublishIdeaEndpoint extends Endpoint {
    constructor(idea) {
        super();
        this._idea = idea;
    }
    url() {
        return 'ideas/'+ this._idea.id
    }

    method() {
        return 'PUT';
    }

    ownResponses() {
        return [SuccessfulApiResponse];
    }

    needsAuthorization() {
        return true;
    }
}