import {Endpoint, SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class DeleteCommentEndpoint extends Endpoint {
    constructor(title, commentId) {
        super();
        this._title = title;
        this._commentId = commentId;
    }

    url() {
        return './public-ideas/' + this._title + '/comments/' + this._commentId;
    }

    method() {
        return 'DELETE';
    }

    ownResponses() {
        return [SuccessfulApiResponse];
    }

    needsAuthorization() {
        return true;
    }
}