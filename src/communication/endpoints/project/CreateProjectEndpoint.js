import {Endpoint} from "@eryxcoop/appyx-comm";
import SuccessfulApiResponse from "@eryxcoop/appyx-comm/src/responses/generalResponses/SuccessfulApiResponse";

export default class CreateProjectEndpoint extends Endpoint {

    url() {
        return 'projects'
    }

    method() {
        return this.constructor.postMethod()
    }

    ownResponses() {
        return [SuccessfulApiResponse];
    }

    needsAuthorization() {
        return true;
    }
}