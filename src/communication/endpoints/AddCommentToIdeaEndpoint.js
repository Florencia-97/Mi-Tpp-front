import {Endpoint} from "@eryxcoop/appyx-comm";
import IdeasListResponse from "../responses/IdeasListResponse";
import SuccessfulApiResponse from "@eryxcoop/appyx-comm/src/responses/generalResponses/SuccessfulApiResponse";

export default class AddCommentToIdeaEndpoint extends Endpoint {
    url() {
        return 'ideas/'
    }

    method() {
        this.constructor.postMethod()
    }

    ownResponses() {
        return [SuccessfulApiResponse];
    }

    needsAuthorization() {
        return true;
    }
}