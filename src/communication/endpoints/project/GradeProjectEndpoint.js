import {Endpoint} from "@eryxcoop/appyx-comm";
import SuccessfulApiResponse from "@eryxcoop/appyx-comm/src/responses/generalResponses/SuccessfulApiResponse";

export default class GradeProjectEndpoint extends Endpoint {

    constructor(projectId) {
        super();
        this._projectId = projectId;
    }


    url() {
        return 'projects/' + this._projectId + '/grade';
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