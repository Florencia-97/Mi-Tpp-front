export default class IdeaAdapter {

    constructor(idea) {
        this._idea = idea;
    }
    parse() {
        return {
            id: this._idea.id,
            title: this._idea.title,
            type: this._idea.published ? 'published' : 'draft',
            description: this._idea.description,
            owner: this._idea.owner,
            similarIdea: this._idea.max_similar_idea,
            tags: this._idea.tags,
        }
    }
}