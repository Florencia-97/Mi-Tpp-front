import {SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class LoginResponse extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            object: {
                token: 'afsdfasdf',
                can_operate: false,
            },
        }
    }

    token() {
        return this.content().token;
    }
}