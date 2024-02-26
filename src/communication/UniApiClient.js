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
import LoginEndpoint from "./endpoints/LoginEndpoint";
import User from "../app/User";
import RegisterEndpoint from "./endpoints/RegisterEndpoint";
import AddBinnacleEntryEndpoint from "./endpoints/binnacle/AddBinnacleEntryEndpoint";
import GetBinnacleEntriesEndpoint from "./endpoints/binnacle/GetBinnacleEntriesEndpoint";
import CreateProjectEndpoint from "./endpoints/project/CreateProjectEndpoint";
import FinishProjectEndpoint from "./endpoints/project/FinishProjectEndpoint";

export default class UniApiClient extends ApiClient {
    async getIdeas(searchText = undefined) {
        let values = {
            searchText: searchText || '',
        };

        const endpoint = new IdeasEndpoint();
        return new IdeasListResponse({});
        return this._callEndpoint(endpoint, values);
    }


    async loginUser(accessToken) {
        let values = {
            access_token: accessToken
        };

        return new User({
            email: 'flor@fmail.com',
            name: 'Flor',
            picture: ''
        })

        const endpoint = new LoginEndpoint();
        return this._callEndpoint(endpoint, values);
    }

    async registerUser(accessToken) {
        let values = {
            access_token: accessToken
        };

        return new User({
            email: 'flor@fmail.com',
            name: 'Flor',
            picture: ''
        })

        const endpoint = new RegisterEndpoint();
        return this._callEndpoint(endpoint, values);
    }

    async addBinnacleEntry(projectId, newBinnacle) {
        let values = {
            comment: newBinnacle.text,
            date: newBinnacle.date
        };

        const endpoint = new AddBinnacleEntryEndpoint(projectId);
        return this._callEndpoint(endpoint, values);
    }

    async getBinnacleEntries(projectId) {
        const endpoint = new GetBinnacleEntriesEndpoint(projectId);
        return this._callEndpoint(endpoint, {});
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

    async getPublicProjects() {
        return [];
    }

    // Projects

    async createProject(newProject) {
        const values = {
            title: 'title',
            description: 'description',
            tags: '',
            students: 'flor@gmail.com,nnn@gmail.com',
            professors: 'flor@gmail.com,nnn@gmail.com',
            link: 'link'
        }
        const endpoint = new CreateProjectEndpoint();
    }

    async getProjectInfoFor(projectId) {
        return 4;
    }

    async approveProject(projectId) {
        return 4;
    }

    async finishProject(projectId) {
        return 4;
    }

    async gradeProject(projectId) {
        return 4;
    }

    async publishProject(projectId, title, description, link_to_project, link_to_future_work) {
        const values = {
            title: title,
            description: description,
            link_to_project: link_to_project,
            link_to_future_work: link_to_future_work
        }
        const endpoint = new FinishProjectEndpoint(projectId);
        return this._callEndpoint(endpoint, values);
    }
}