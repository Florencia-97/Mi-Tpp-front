import {SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class IdeaCommentsResponse extends SuccessfulApiResponse {

    static defaultResponse() {
        return {
            errors: [],
            object: [
                {
                    "comment": "Que grandee",
                    "date": "2024-03-24 13:52:25.578455+00",
                    "id": "1",
                    "owner": {
                        "career": "",
                        "email": "flrodriguez@fi.uba.ar",
                        "name": "Florencia Rodríguez"
                    }
                }
            ]
        }
    }

    comments() {
        return this.content();
    }
}