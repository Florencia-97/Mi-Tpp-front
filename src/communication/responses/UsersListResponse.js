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
    const users = this.content();
    return users.map(user => this._parseUser(user));
  }
}