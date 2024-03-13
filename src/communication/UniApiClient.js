import {ApiClient} from "@eryxcoop/appyx-comm";
import IdeasEndpoint from "./endpoints/IdeasEndpoint";
import DeleteIdeaEndpoint from "./endpoints/DeleteIdeaEndpoint";
import EditIdeaEndpoint from "./endpoints/EditIdeaEndpoint";
import PublishIdeaEndpoint from "./endpoints/PublishIdeaEndpoint";
import ChangeOwnersIdeasEndpoint from "./endpoints/ChangeOwnersIdeasEndpoint";
import GetIdeaEndpoint from "./endpoints/GetIdeaEndpoint";
import AddCommentToIdeaEndpoint from "./endpoints/AddCommentToIdeaEndpoint";
import IdeaResponse from "./responses/IdeaResponse";
import LoginEndpoint from "./endpoints/LoginEndpoint";
import RegisterEndpoint from "./endpoints/RegisterEndpoint";
import AddBinnacleEntryEndpoint from "./endpoints/binnacle/AddBinnacleEntryEndpoint";
import GetBinnacleEntriesEndpoint from "./endpoints/binnacle/GetBinnacleEntriesEndpoint";
import CreateProjectEndpoint from "./endpoints/project/CreateProjectEndpoint";
import FinishProjectEndpoint from "./endpoints/project/FinishProjectEndpoint";
import CreateIdeaEndpoint from "./endpoints/CreateIdeaEndpoint";
import PublishedIdeasEndpoint from "./endpoints/PublishedIdeasEndpoint";
import GetProjectEndpoint from "./endpoints/project/GetProjectEndpoint";
import GetProjectsEndpoint from "./endpoints/project/GetProjectsEndpoint";
import GetAdminUsersEndpoints from "./endpoints/admin/GetAdminUsersEndpoints";
import GetTeachersUsersEndpoints from "./endpoints/admin/GetTeachersUsersEndpoints";
import ApproveTeacherUserEndpoints from "./endpoints/admin/ApproveTeacherUserEndpoints";
import RemoveAdminUserEndpoints from "./endpoints/admin/RemoveAdminUserEndpoints";
import RemoveTeacherUserEndpoints from "./endpoints/admin/RemoveTeacherUserEndpoints";
import AddAdminUserEndpoints from "./endpoints/admin/AddAdminUserEndpoints";

export default class UniApiClient extends ApiClient {
    async getIdeas(searchText = undefined) {
        let values = {
            searchText: searchText || '',
        };

        const endpoint = new IdeasEndpoint();
        return this._callEndpoint(endpoint, values);
    }

    async getPublicIdeas(searchText = undefined) {
        let values = {
            searchText: searchText || '',
        };

        const endpoint = new PublishedIdeasEndpoint();
        return this._callEndpoint(endpoint, values);
    }

    async createIdea(idea) {
        let values = {
            title: idea.title,
            description: idea.description,
            tags: idea.tags,
        };

        const endpoint = new CreateIdeaEndpoint();
        return this._callEndpoint(endpoint, values);
    }


    async loginUser(accessToken) {
        let values = {
            token: accessToken
        };
        const endpoint = new LoginEndpoint();
        return this._callEndpoint(endpoint, values);
    }

    async registerUser(accessToken) {
        let values = {
            token: accessToken
        };
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
        const endpoint = new DeleteIdeaEndpoint(idea.id);
        return this._callEndpoint(endpoint, {});
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
            title: newProject.title,
            description: newProject.description,
            tags: newProject.tags,
            students: 'flor@gmail.com,nnn@gmail.com',
            professors: 'flor@gmail.com,nnn@gmail.com',
            link: newProject.link
        }
        const endpoint = new CreateProjectEndpoint();
        return this._callEndpoint(endpoint, values);
    }

    async getProjectInfoFor() {
        const endpoint = new GetProjectEndpoint();
        return this._callEndpoint(endpoint, {});
    }

    async getTeacherProjects() {
        const endpoint = new GetProjectsEndpoint();
        return this._callEndpoint(endpoint, {});
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

    // Admin functions

    async getAdminUsers() {
        const endpoint = new GetAdminUsersEndpoints();
        return this._callEndpoint(endpoint, {});
    }

    async getTeacherUsers() {
        const endpoint = new GetTeachersUsersEndpoints();
        return this._callEndpoint(endpoint, {});
    }

    async approveTeacherUser(teacherEmail) {
        const endpoint = new ApproveTeacherUserEndpoints();
        return this._callEndpoint(endpoint, {email: teacherEmail});
    }

    async addAdminUser(adminEmail) {
        const endpoint = new AddAdminUserEndpoints();
        return this._callEndpoint(endpoint, {email: adminEmail});
    }

    async removeTeacherUser(teacherEmail) {
        const endpoint = new RemoveTeacherUserEndpoints(teacherEmail);
        return this._callEndpoint(endpoint, {});
    }

    async removeAdminUser(adminEmail) {
        const endpoint = new RemoveAdminUserEndpoints(adminEmail);
        return this._callEndpoint(endpoint, {});
    }
}