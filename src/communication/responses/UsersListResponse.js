import {SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class UsersListResponse extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            object: [{
                'title': 'title',
                'description': 'short description',
                'published': true,
                'owner': 'owner',
                'tags': "tag1,tag2, tag3",
                'maxSimilarityTitle': "title"
            }],
        }
    }

    _parseIdea(idea) {
        return {
            id: idea.title,
            name: idea.title,
            type: idea.published ? 'published' : 'draft',
            shortDescription: idea.description,
        }
    }

    ideas() {
        const ideas = this.content();
        return ideas.map(idea => this._parseIdea(idea));
    }
}