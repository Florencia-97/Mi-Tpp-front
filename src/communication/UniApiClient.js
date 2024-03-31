import {ApiClient} from "@eryxcoop/appyx-comm";
import IdeasEndpoint from "./endpoints/ideas/IdeasEndpoint";
import DeleteIdeaEndpoint from "./endpoints/ideas/DeleteIdeaEndpoint";
import UpdateIdeaEndpoint from "./endpoints/ideas/UpdateIdeaEndpoint";
import GetIdeaEndpoint from "./endpoints/ideas/GetIdeaEndpoint";
import IdeaResponse from "./responses/IdeaResponse";
import AccessEndpoint from "./endpoints/AccessEndpoint";
import AddBinnacleEntryEndpoint from "./endpoints/binnacle/AddBinnacleEntryEndpoint";
import GetBinnacleEntriesEndpoint from "./endpoints/binnacle/GetBinnacleEntriesEndpoint";
import CreateProjectEndpoint from "./endpoints/project/CreateProjectEndpoint";
import FinishProjectEndpoint from "./endpoints/project/FinishProjectEndpoint";
import CreateIdeaEndpoint from "./endpoints/ideas/CreateIdeaEndpoint";
import PublishedIdeasEndpoint from "./endpoints/ideas/PublishedIdeasEndpoint";
import GetTeacherProjectEndpoint from "./endpoints/project/GetTeacherProjectEndpoint";
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
import GradeProjectEndpoint from "./endpoints/project/GradeProjectEndpoint";
import PublishProjectEndpoint from "./endpoints/project/PublishProjectEndpoint";
import UpdateProjectEndpoint from "./endpoints/project/UpdateProjectEndpoint";
import GetAllPublishedProjectsEndpoint from "./endpoints/project/GetAllProjectsEndpoint";
import GetProjectsAsSupervisorEndpoint from "./endpoints/project/GetProjectsAsSupervisorEndpoint";
import UpdateSupervisorOfProjectEndpoint from "./endpoints/project/AddSupervisorToProjectEndpoint";
import DeclineProjectEndpoint from "./endpoints/project/DeclineProjectEndpoint";
import GetStudentProjectEndpoint from "./endpoints/project/GetStudentProjectEndpoint";
import GetStatsEndpoint from "./endpoints/GetStatsEndpoint";

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
      title: searchText || '',
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
  async accessUser(accessToken, userLogin) {
    let values = {
      token: accessToken,
      user_type: userLogin === 'TEACHER' ? 'Professor' : 'Student' // add admin
    };
    const endpoint = new AccessEndpoint();
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

  async editIdea(idea, description) {
    let values = {
      description: description,
    };

    const endpoint = new UpdateIdeaEndpoint(idea);
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
      published: 'True'
    };

    const endpoint = new UpdateIdeaEndpoint(idea);
    return this._callEndpoint(endpoint, values);
  }

  async changeOwnersIdeas(idea, newOwnersEmail) {
    let values = {
      owner: newOwnersEmail
    };
    const endpoint = new UpdateIdeaEndpoint(idea);
    return this._callEndpoint(endpoint, values);
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

  async getProjectInfoForTeacher(projectId) {
    const endpoint = new GetTeacherProjectEndpoint(projectId);
    return this._callEndpoint(endpoint, {});
  }

  async getProjectInfoForStudent() {
    const endpoint = new GetStudentProjectEndpoint();
    return this._callEndpoint(endpoint, {});
  }

  async getPublishedProjects() {
    const endpoint = new GetAllPublishedProjectsEndpoint();
    return this._callEndpoint(endpoint, {});
  }

  async getTeacherProjects(errorHandler) {
    const endpoint = new GetProjectsEndpoint();
    return this._callEndpoint(endpoint, {}, errorHandler);
  }

  async getSupervisorProjects(errorHandler) {
    const endpoint = new GetProjectsAsSupervisorEndpoint();
    return this._callEndpoint(endpoint, {}, errorHandler);
  }

  async addSupervisorToProject(projectId, supervisorEmail) {
    const endpoint = new UpdateSupervisorOfProjectEndpoint(projectId);
    return this._callEndpoint(endpoint, {supervisor: supervisorEmail});
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

  async gradeProject(projectId, comment) {
    const endpoint = new GradeProjectEndpoint(projectId);
    return this._callEndpoint(endpoint, {comment});
  }

  async publishProject(projectId) {
    const endpoint = new PublishProjectEndpoint(projectId);
    return this._callEndpoint(endpoint, {});
  }

  async declineProject(projectId, comment) {
    const endpoint = new DeclineProjectEndpoint(projectId);
    return this._callEndpoint(endpoint, {comment});
  }

  async updateProjectToPublishProject(projectId, title, description, linkToProject, linkToFutureWork) {
    const values = {
      title: title,
      description: description,
      link_to_project: linkToProject,
      link_to_future_work: linkToFutureWork,
      tags: 'ia,ml'
    }
    const endpoint = new UpdateProjectEndpoint(projectId);
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

  //  Stats

  getStats() {
    const endpoint = new GetStatsEndpoint();
    return this._callEndpoint(endpoint, {});
  }
}