import {SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class TeacherProjectsResponse extends SuccessfulApiResponse {
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
                    'professors': 'professors',
                    'status': 'status'
                }
            ],
            error: []
        }
    }

    projects() {
        return this.content();
    }
}