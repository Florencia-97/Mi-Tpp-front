import {Endpoint} from "@eryxcoop/appyx-comm";
import TeacherProjectsResponse from "../../responses/TeacherProjectsResponse";

export default class GetProjectsEndpoint extends Endpoint {

    url() {
        return 'projects';
    }

    method() {
        return this.constructor.getMethod()
    }

    ownResponses() {
        return [TeacherProjectsResponse];
    }

    needsAuthorization() {
        return true;
    }
}