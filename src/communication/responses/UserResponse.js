import {SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class UserResponse extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            "object": {
                'username': 'username',
                'email': 'email',
                'career': 'career',
                'token': 'token',
                'picture': 'picture',
                'role': 'role',
                'description': 'description',
                'projects_cap': 3,
                'can_operate': 'can_operate'
            },
            "errors": []
        }
    }

    user() {
        return this.content();
    }
}