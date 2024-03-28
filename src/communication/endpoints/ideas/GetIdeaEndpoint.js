import {Endpoint} from "@eryxcoop/appyx-comm";
import IdeaResponse from "../../responses/IdeaResponse";

export default class GetIdeaEndpoint extends Endpoint {
    url() {
        return 'ideas/'
    }

    method() {
        this.constructor.getMethod()
    }

    ownResponses() {
        return [IdeaResponse];
    }

    needsAuthorization() {
        return true;
    }
}