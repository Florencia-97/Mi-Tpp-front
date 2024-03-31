import {Endpoint} from "@eryxcoop/appyx-comm";
import ProjectResponse from "../../responses/ProjectResponse";

export default class GetTeacherProjectEndpoint extends Endpoint {
    constructor(projectId) {
        super();
        this._projectId = projectId;
    }

    url() {
        return 'projects/' + this._projectId;
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