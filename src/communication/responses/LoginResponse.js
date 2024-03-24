import {SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class LoginResponse extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            object: {
                token: 'afsdfasdf',
                can_operate: false,
                email: 'email',
            },
        }
    }

    token() {
        return this.content().token;
    }

    canUserOperate() {
        return this.content().can_operate;
    }

    email() {
        return this.content().email;
    }
}