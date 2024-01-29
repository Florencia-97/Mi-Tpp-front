import {ApiClient} from "@eryxcoop/appyx-comm";
import IdeasEndpoint from "./endpoints/IdeasEndpoint";
import IdeasListResponse from "./responses/IdeasListResponse";
import DeleteIdeaEndpoint from "./endpoints/DeleteIdeaEndpoint";
import EditIdeaEndpoint from "./endpoints/EditIdeaEndpoint";
import PublishIdeaEndpoint from "./endpoints/PublishIdeaEndpoint";
import ChangeOwnersIdeasEndpoint from "./endpoints/ChangeOwnersIdeasEndpoint";
import GetIdeaEndpoint from "./endpoints/GetIdeaEndpoint";
import AddCommentToIdeaEndpoint from "./endpoints/AddCommentToIdeaEndpoint";
import IdeaResponse from "./responses/IdeaResponse";

export default class UniApiClient extends ApiClient {
    async getIdeas(searchText=undefined) {
        let values = {
            searchText: searchText || '',
        };

        const endpoint = new IdeasEndpoint();
        return new IdeasListResponse({});
        return this._callEndpoint(endpoint, values);
    }

    async editIdea(idea) {
        let values = {
            id: idea.id,
            title: idea.title,
            shortDescription: idea.shortDescription,
            labels: idea.labels,
        };

        const endpoint = new EditIdeaEndpoint();
        return this._callEndpoint(endpoint, values);
    }

    async getIdea(ideaId) {
        let values = {id: ideaId};
        const endpoint = new GetIdeaEndpoint();
        return new IdeaResponse({});
        return this._callEndpoint(endpoint, values);
    }

    async addCommentToIdea(ideaId, comment) {
        let values = {};
        const endpoint = new AddCommentToIdeaEndpoint();
        return this._callEndpoint(endpoint, values);
    }

    async deleteIdea(idea) {
        let values = {};

        const endpoint = new DeleteIdeaEndpoint();
        return this._callEndpoint(endpoint, values);
    }

    async publishIdea(idea) {
        let values = {};

        const endpoint = new PublishIdeaEndpoint();
        return this._callEndpoint(endpoint, values);
    }

    async changeOwnersIdeas(idea) {
        let values = {};

        const endpoint = new ChangeOwnersIdeasEndpoint();
        return this._callEndpoint(endpoint, values);
    }
}