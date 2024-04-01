import {SuccessfulApiResponse} from "@eryxcoop/appyx-comm";
import IdeaAdapter from "../adapters/IdeaAdapter";

export default class IdeasListResponse extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            object: [{
                'id': 1,
                'title': 'title',
                'description': 'short description',
                'published': true,
                'owner': 'owner',
                'tags': "tag1,tag2, tag3",
                'max_similar_idea': "title"
            }],
        }
    }

    ideas() {
        const ideas = this.content();
        return ideas.map(idea => new IdeaAdapter(idea).parse());
    }
}