import {SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class RegisterResponse extends SuccessfulApiResponse {
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