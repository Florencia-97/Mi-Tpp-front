import {Endpoint} from "@eryxcoop/appyx-comm";
import ProjectResponse from "../../responses/ProjectResponse";

export default class GetProjectEndpoint extends Endpoint {

    url() {
        return 'projects'
    }

    method() {
        return this.constructor.getMethod();
    }

    ownResponses() {
        return [ProjectResponse];
    }

    needsAuthorization() {
        return true;
    }
}