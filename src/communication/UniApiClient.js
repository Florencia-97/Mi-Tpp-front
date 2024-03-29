import {ApiClient} from "@eryxcoop/appyx-comm";
import IdeasEndpoint from "./endpoints/ideas/IdeasEndpoint";
import DeleteIdeaEndpoint from "./endpoints/ideas/DeleteIdeaEndpoint";
import EditIdeaEndpoint from "./endpoints/ideas/EditIdeaEndpoint";
import PublishIdeaEndpoint from "./endpoints/ideas/PublishIdeaEndpoint";
import ChangeOwnersIdeasEndpoint from "./endpoints/ideas/ChangeOwnersIdeasEndpoint";
import GetIdeaEndpoint from "./endpoints/ideas/GetIdeaEndpoint";
import IdeaResponse from "./responses/IdeaResponse";
import LoginEndpoint from "./endpoints/LoginEndpoint";
import RegisterEndpoint from "./endpoints/RegisterEndpoint";
import AddBinnacleEntryEndpoint from "./endpoints/binnacle/AddBinnacleEntryEndpoint";
import GetBinnacleEntriesEndpoint from "./endpoints/binnacle/GetBinnacleEntriesEndpoint";
import CreateProjectEndpoint from "./endpoints/project/CreateProjectEndpoint";
import FinishProjectEndpoint from "./endpoints/project/FinishProjectEndpoint";
import CreateIdeaEndpoint from "./endpoints/ideas/CreateIdeaEndpoint";
import PublishedIdeasEndpoint from "./endpoints/ideas/PublishedIdeasEndpoint";
import GetProjectEndpoint from "./endpoints/project/GetProjectEndpoint";
import GetProjectsEndpoint from "./endpoints/project/GetProjectsEndpoint";
import GetAdminUsersEndpoints from "./endpoints/admin/GetAdminUsersEndpoints";
import GetTeachersUsersEndpoints from "./endpoints/admin/GetTeachersUsersEndpoints";
import ApproveTeacherUserEndpoints from "./endpoints/admin/ApproveTeacherUserEndpoints";
import RemoveAdminUserEndpoints from "./endpoints/admin/RemoveAdminUserEndpoints";
import RemoveTeacherUserEndpoints from "./endpoints/admin/RemoveTeacherUserEndpoints";
import AddAdminUserEndpoints from "./endpoints/admin/AddAdminUserEndpoints";
import GetCommentsEndpoint from "./endpoints/comments/GetCommentsEndpoint";
import DeleteCommentEndpoint from "./endpoints/comments/DeleteCommentEndpoint";
import AddCommentEndpoint from "./endpoints/comments/AddCommentEndpoint";
import UpdateUserProfileEndpoint from "./endpoints/UpdateUserProfileEndpoint";
import GetUserProfileEndpoint from "./endpoints/GetUserProfileEndpoint";
import GetStudentsWithoutProjectsEndpoint from "./endpoints/project/GetStudentsWithoutProjectsEndpoint";
import GetTeachersForProjectsEndpoint from "./endpoints/project/GetTeachersForProjectsEndpoint";
import ApproveProjectEndpoint from "./endpoints/project/ApproveProjectEndpoint";
import DeleteBinnacleEntryEndpoint from "./endpoints/binnacle/DeleteBinnacleEntryEndpoint";

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

  async registerUser(accessToken, userLogin) {
    let values = {
      token: accessToken,
      user_type: userLogin === 'TEACHER' ? 'Professor' : 'Student'
    };
    const endpoint = new RegisterEndpoint();
    return this._callEndpoint(endpoint, values);
  }

  async addBinnacleEntry(projectId, newBinnacleEntry, date) {
    const dateString = date.toLocaleDateString();
    let finalDateString = dateString.split("/");
    finalDateString = finalDateString[2] + '-' + finalDateString[0] + '-' + finalDateString[1];
    let values = {
      comment: newBinnacleEntry,
      date: finalDateString
    };
    const endpoint = new AddBinnacleEntryEndpoint(projectId);
    return this._callEndpoint(endpoint, values);
  }

  async getBinnacleEntries(projectId) {
    const endpoint = new GetBinnacleEntriesEndpoint(projectId);
    return this._callEndpoint(endpoint, {});
  }

  async deleteBinnacleEntry(projectId, binnacleId) {
    const endpoint = new DeleteBinnacleEntryEndpoint(projectId, binnacleId);
    return this._callEndpoint(endpoint, {});
  }

  async editIdea(idea) {
    let values = {
      id: idea.id,
      title: idea.title,
      description: idea.description,
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

  async deleteIdea(idea) {
    const endpoint = new DeleteIdeaEndpoint(idea.id);
    return this._callEndpoint(endpoint, {});
  }

  async publishIdea(idea) {
    let values = {
      title: idea.id,
      description: idea.description,
      published: 'True',
      owner: 'frodriguez@eryxsoluciones.com.ar'
    };

    console.log(values, idea)

    const endpoint = new PublishIdeaEndpoint(idea);
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
      students: newProject.students,
      professors: newProject.professors,
      link: newProject.link
    }
    const endpoint = new CreateProjectEndpoint();
    return this._callEndpoint(endpoint, values);
  }

  async getProjectInfoFor() {
    const endpoint = new GetProjectEndpoint();
    return this._callEndpoint(endpoint, {});
  }

  async getTeacherProjects(errorHandler) {
    const endpoint = new GetProjectsEndpoint();
    return this._callEndpoint(endpoint, {}, errorHandler);
  }

  async getStudentsWithoutProjects() {
    const endpoint = new GetStudentsWithoutProjectsEndpoint();
    return this._callEndpoint(endpoint, {});
  }

  async getTeachersToSelect() {
    const endpoint = new GetTeachersForProjectsEndpoint();
    return this._callEndpoint(endpoint, {});
  }

  async approveProject(projectId) {
    const endpoint = new ApproveProjectEndpoint(projectId);
    return this._callEndpoint(endpoint, {});
  }

  async finishProject(projectId) {
    const endpoint = new FinishProjectEndpoint(projectId);
    return this._callEndpoint(endpoint, {});
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

  async addAdminUser(newAdminEmail) {
    const endpoint = new AddAdminUserEndpoints();
    return this._callEndpoint(endpoint, {email: newAdminEmail});
  }

  async approveTeacherUser(teacherEmail) {
    const endpoint = new ApproveTeacherUserEndpoints();
    return this._callEndpoint(endpoint, {email: teacherEmail});
  }

  async removeTeacherUser(teacherEmail) {
    const endpoint = new RemoveTeacherUserEndpoints(teacherEmail);
    return this._callEndpoint(endpoint, {});
  }

  async removeAdminUser(adminEmail) {
    const endpoint = new RemoveAdminUserEndpoints(adminEmail);
    return this._callEndpoint(endpoint, {});
  }

  // Comments

  async getComments(ideaId) {
    const endpoint = new GetCommentsEndpoint(ideaId);
    return this._callEndpoint(endpoint, {});
  }

  async addCommentToIdea(ideaId, comment) {
    let values = {comment};
    const endpoint = new AddCommentEndpoint(ideaId);
    return this._callEndpoint(endpoint, values);
  }

  async deleteComment(ideaId, commentId) {
    const endpoint = new DeleteCommentEndpoint(ideaId, commentId);
    return this._callEndpoint(endpoint, {});
  }

  // Users

  updateUserProfile(email, career) {
    const values = {
      career: career,
      username: 'username?',
    };
    const endpoint = new UpdateUserProfileEndpoint(email);
    return this._callEndpoint(endpoint, values);
  }

  getUserProfile(email) {
    const endpoint = new GetUserProfileEndpoint(email);
    return this._callEndpoint(endpoint, {});
  }
}