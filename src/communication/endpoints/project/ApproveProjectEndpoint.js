import {Endpoint} from "@eryxcoop/appyx-comm";
import SuccessfulApiResponse from "@eryxcoop/appyx-comm/src/responses/generalResponses/SuccessfulApiResponse";

export default class ApproveProjectEndpoint extends Endpoint {

    constructor(projectId) {
        super();
        this._projectId = projectId;
    }


    url() {
        return 'projects/' + this._projectId + '/approve';
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