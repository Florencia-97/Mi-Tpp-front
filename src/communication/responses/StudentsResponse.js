import {SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class StudentsResponse extends SuccessfulApiResponse {
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

  students() {
    return this.content();
  }
}