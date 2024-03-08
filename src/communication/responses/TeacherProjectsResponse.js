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

    project() {
        return this.content();
    }
}