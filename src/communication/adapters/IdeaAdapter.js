export default class IdeaAdapter {

    constructor(idea) {
        this._idea = idea;
    }
    parse() {
        return {
            id: this._idea.title,
            title: this._idea.title,
            type: this._idea.published ? 'published' : 'draft',
            description: this._idea.description,
            owner: this._idea.owner,
        }
    }
}