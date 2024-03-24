import {Endpoint, SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class AddCommentEndpoint extends Endpoint {
    constructor(title) {
        super();
        this._title = title;
    }

    url() {
        return './public-ideas/' + this._title + '/comments';
    }

    method() {
        return this.constructor.postMethod();
    }

    ownResponses() {
        return [SuccessfulApiResponse];
    }

    needsAuthorization() {
        return true;
    }
}