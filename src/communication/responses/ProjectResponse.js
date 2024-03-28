import {SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class ProjectResponse extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            object: [
                {
                    'id': 'id',
                    'title': 'title',
                    'description': 'description',
                    'tags': 'tags',
                    'link': 'link',
                    'students': 'students',
                    'professors': 'professors1,professors2',
                    'status': 'status'
                }
            ],
            error: []
        }
    }

    project() {
        return this.content()[0];
    }
}