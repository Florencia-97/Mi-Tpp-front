import {SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class UsersListResponse extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            object: [{
                'email': 'adf@asdf.com',
                'can_operate': true,
            }],
        }
    }

    _parseUser(user) {
        return {
            email: user.email,
            canOperate: user.can_operate,
        }
    }

    users() {
        return [
            {email:'hola@gola.com' , canOperate: true},
            {email:'chau@asdf.com' , canOperate: false},
            {email:'mmama@asdf.com' , canOperate: true},
            {email:'daleqda.com' , canOperate: true},
        ]
        const users = this.content();
        return users.map(idea => this._parseUser(idea));
    }
}