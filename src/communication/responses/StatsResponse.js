import {SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class StatsResponse extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            "object": {
            },
            "errors": []
        }
    }

    stats() {
        return this.content();
    }
}