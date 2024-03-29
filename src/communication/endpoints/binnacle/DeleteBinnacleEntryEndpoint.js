import {Endpoint} from "@eryxcoop/appyx-comm";
import IdeasListResponse from "../../responses/IdeasListResponse";
import SuccessfulApiResponse from "@eryxcoop/appyx-comm/src/responses/generalResponses/SuccessfulApiResponse";

export default class DeleteBinnacleEntryEndpoint extends Endpoint {

    constructor(projectId, binnacleId) {
        super();
        this._projectId = projectId;
        this._binnacleId = binnacleId;
    }

    url() {
        return 'projects/'+this._projectId+'/binnacle/'+this._binnacleId;
    }

    method() {
        return 'DELETE';
    }

    ownResponses() {
        return [SuccessfulApiResponse];
    }

    needsAuthorization() {
        return true;
    }
}