import {RemoteRequester} from "@eryxcoop/appyx-comm";

export default class RemoteRequesterUni extends RemoteRequester {
    constructor(url, authorizationManager) {
        super(url, authorizationManager);
    }

    _buildRequest(endpoint, data) {
        let headers = this._buildHeadersFor(endpoint);
        let requestOptions = {
            method: endpoint.method(),
            headers: headers,
            credentials: 'include', // include cookie credentials
        };

        if (endpoint.method() !== 'GET') {
            let encoder = this._encoderFor(endpoint.contentType());
            Object.assign(headers, encoder.headers());
            Object.assign(requestOptions, {body: encoder.encode(data)});
        }

        return requestOptions;
    }

    _buildHeadersFor(endpoint) {
        let headers = {};
        if (endpoint.contentType() && endpoint.contentType() !== "multipart/form-data") {
            headers['Content-Type'] = endpoint.contentType();
            headers['Allow-Control-Allow-Origin'] = 'true';
        }

        if (endpoint.needsAuthorization()) {
            this._authorizationManager.configureHeaders(headers);
        }

        return headers;
    }
}