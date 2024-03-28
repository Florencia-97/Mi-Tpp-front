import {Endpoint} from "@eryxcoop/appyx-comm";
import IdeasListResponse from "../../responses/IdeasListResponse";

export default class DeleteIdeaEndpoint extends Endpoint {
    constructor(ideaId) {
        super();
        this._ideaId = ideaId;
    }
    url() {
        return `ideas/${this._ideaId}`
    }

    method() {
        return 'DELETE'
    }

    ownResponses() {
        return [IdeasListResponse];
    }

    needsAuthorization() {
        return true;
    }
}