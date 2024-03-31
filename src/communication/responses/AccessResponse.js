import {SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class AccessResponse extends SuccessfulApiResponse {
  static defaultResponse() {
    return {
      object: {
        token: 'afsdfasdf',
        can_operate: false,
        picture: 'picture.png',
        email: 'email',
        username: 'ab'
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

  picture() {
    return this.content().picture;
  }

  username() {
    return this.content().username;
  }
}