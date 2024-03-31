import {SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class UsersResponse extends SuccessfulApiResponse {
  static defaultResponse() {
    return {
      object: [
        {
          username: 'username',
          email: 'email',
          career: 'career',
          token: 'token',
          picture: 'picture',
          role: 'role',
          can_operate: 'can_operate'
        }
      ],
      error: []
    }
  }

  users() {
    return this.content();
  }
}