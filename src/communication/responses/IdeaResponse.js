import {SuccessfulApiResponse} from "@eryxcoop/appyx-comm";

export default class IdeaResponse extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            object: {
                idea: {
                    title: "string",
                    description: "string",
                    published: "bool",
                    owner: {
                        "name": "string",
                        "email": "string",
                        "avatar": "string",
                        "career": "string"
                    },
                    maxSimiliratyTitle: "bool",
                    comments: [
                        {
                            "owner": {
                                "name": "string",
                                "email": "string",
                                "avatar": "string",
                                "career": "string"
                            },
                            "comment": "string",
                            "date": "date"
                        }
                    ]
                }

            },
        }
    }

    idea() {
        //return this.content().ideas;
        return {
            title: "Sitio de recomendacion.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            published: true,
            owner: {
                "name": "Delfi Brea",
                "email": "",
                career: "Ingeniería en Sistemas de Información"
            },
            comments: [
                {
                    "owner": {
                        "name": "Delfi Brea",
                        "email": "",
                        career: "Ingeniería en Sistemas de Información"
                    },
                    "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "date": "date"
                },
                {
                    "owner": {
                        "name": "Delfi Brea",
                        "email": "",
                        career: "Ingeniería en Sistemas de Información"
                    },
                    "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "date": "date"
                }
            ]
        }
    }
}