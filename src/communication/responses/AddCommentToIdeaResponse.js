import {SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class IdeasListResponse extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            object: {
                ideas: [],
            },
        }
    }

    ideas() {
        //return this.content().ideas;
        return [
            {
                name: 'Sitio de recomendacion.',
                type: 'published',
                shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo."
            },
            {
                name: 'Sitio de compras.',
                type: 'published',
                shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo."
            },
            {
                name: 'Bactracking para envios de provincia.',
                type: 'draft',
                shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo."
            }
        ]
    }
}