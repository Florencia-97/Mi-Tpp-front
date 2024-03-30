import {Endpoint} from "@eryxcoop/appyx-comm";
import SuccessfulApiResponse from "@eryxcoop/appyx-comm/src/responses/generalResponses/SuccessfulApiResponse";

export default class PublishProjectEndpoint extends Endpoint {

    constructor(projectId) {
        super();
        this._projectId = projectId;
    }


    url() {
        return 'projects/' + this._projectId + '/publish';
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