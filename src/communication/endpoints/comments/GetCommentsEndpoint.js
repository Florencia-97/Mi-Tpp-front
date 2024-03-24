import {Endpoint, SuccessfulApiResponse} from "@eryxcoop/appyx-comm";
import IdeaCommentsResponse from "../../responses/IdeaCommentsResponse";

export default class GetCommentsEndpoint extends Endpoint {
    constructor(title) {
        super();
        this._title = title;
    }

    url() {
        return './public-ideas/' + this._title + '/comments';
    }

    method() {
        return this.constructor.getMethod();
    }

    ownResponses() {
        return [IdeaCommentsResponse];
    }

    needsAuthorization() {
        return true;
    }
}