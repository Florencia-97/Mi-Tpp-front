import {Endpoint, SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class ChangeOwnersIdeasEndpoint extends Endpoint {
  constructor(idea) {
    super();
    this._idea = idea;
  }

  url() {
    return 'ideas/' + this._idea.id
  }

  method() {
    return 'PUT';
  }

  ownResponses() {
    return [SuccessfulApiResponse];
  }

  needsAuthorization() {
    return true;
  }
}