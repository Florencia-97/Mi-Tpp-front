import {SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class BinnacleEntriesResponse extends SuccessfulApiResponse {
  static defaultResponse() {
    return {
      object: [
        {
          comment: 'comment',
          date: 'date',
          creator: 'email'
        },
        {
          comment: 'another comment',
          date: 'date',
          creator: 'email'
        }
      ],
      errors: []
    }
  }

  binnacleEntries() {
    return this.content();
  }
}