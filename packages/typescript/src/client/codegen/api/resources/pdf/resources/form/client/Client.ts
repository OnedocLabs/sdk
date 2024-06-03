/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../../../environments";
import * as core from "../../../../../../core";
import * as fs from "fs";
import * as Fileforge from "../../../../../index";
import urlJoin from "url-join";
import * as serializers from "../../../../../../serialization/index";
import * as errors from "../../../../../../errors/index";
import * as stream from "stream";

export declare namespace Form {
    interface Options {
        environment?: core.Supplier<environments.FileforgeEnvironment | string>;
        apiKey?: core.Supplier<string | undefined>;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
        abortSignal?: AbortSignal;
    }
}

export class Form {
    constructor(protected readonly _options: Form.Options = {}) {}

    /**
     * Returns a list of form fields detected in the PDF document, along with their location, options and requirements. For a more visual representation, use the /pdf/form/mark endpoint.
     *
     * @param {File | fs.ReadStream} file
     * @param {Fileforge.pdf.FormDetectRequest} request
     * @param {Form.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Fileforge.BadRequestError}
     * @throws {@link Fileforge.UnauthorizedError}
     * @throws {@link Fileforge.InternalServerError}
     *
     * @example
     *     await fileforge.pdf.form.detect(fs.createReadStream("/path/to/your/file"), {})
     */
    public async detect(
        file: File | fs.ReadStream,
        request: Fileforge.pdf.FormDetectRequest,
        requestOptions?: Form.RequestOptions
    ): Promise<Fileforge.pdf.FormDetectResponseItem[]> {
        const _request = new core.FormDataWrapper();
        if (request.options != null) {
            await _request.append("options", JSON.stringify(request.options));
        }

        await _request.append("file", file);
        const _maybeEncodedRequest = _request.getRequest();
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FileforgeEnvironment.Default,
                "pdf/form/detect/"
            ),
            method: "POST",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
                ...(await _maybeEncodedRequest.getHeaders()),
            },
            body: await _maybeEncodedRequest.getBody(),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return await serializers.pdf.form.detect.Response.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Fileforge.BadRequestError(
                        await serializers.ErrorSchema.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 401:
                    throw new Fileforge.UnauthorizedError(
                        await serializers.ErrorSchema.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 500:
                    throw new Fileforge.InternalServerError(_response.error.body);
                default:
                    throw new errors.FileforgeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.FileforgeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.FileforgeTimeoutError();
            case "unknown":
                throw new errors.FileforgeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Returns a modified PDF document with form fields marked with a green border, and hover text showing the field name.
     * @throws {@link Fileforge.BadRequestError}
     * @throws {@link Fileforge.UnauthorizedError}
     * @throws {@link Fileforge.InternalServerError}
     */
    public async mark(
        file: File | fs.ReadStream,
        request: Fileforge.pdf.FormMarkRequest,
        requestOptions?: Form.RequestOptions
    ): Promise<stream.Readable> {
        const _request = new core.FormDataWrapper();
        if (request.options != null) {
            await _request.append("options", JSON.stringify(request.options));
        }

        await _request.append("file", file);
        const _maybeEncodedRequest = _request.getRequest();
        const _response = await core.fetcher<stream.Readable>({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FileforgeEnvironment.Default,
                "pdf/form/mark/"
            ),
            method: "POST",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
                ...(await _maybeEncodedRequest.getHeaders()),
            },
            body: await _maybeEncodedRequest.getBody(),
            responseType: "streaming",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return _response.body;
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Fileforge.BadRequestError(
                        await serializers.ErrorSchema.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 401:
                    throw new Fileforge.UnauthorizedError(
                        await serializers.ErrorSchema.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 500:
                    throw new Fileforge.InternalServerError(_response.error.body);
                default:
                    throw new errors.FileforgeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.FileforgeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.FileforgeTimeoutError();
            case "unknown":
                throw new errors.FileforgeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Returns a modified PDF document with filled form fields. A subset of fields can be filled.
     * @throws {@link Fileforge.BadRequestError}
     * @throws {@link Fileforge.UnauthorizedError}
     * @throws {@link Fileforge.InternalServerError}
     */
    public async fill(
        file: File | fs.ReadStream,
        request: Fileforge.pdf.FormFillRequest,
        requestOptions?: Form.RequestOptions
    ): Promise<stream.Readable> {
        const _request = new core.FormDataWrapper();
        if (request.options != null) {
            await _request.append("options", JSON.stringify(request.options));
        }

        await _request.append("file", file);
        const _maybeEncodedRequest = _request.getRequest();
        const _response = await core.fetcher<stream.Readable>({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FileforgeEnvironment.Default,
                "pdf/form/fill/"
            ),
            method: "POST",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
                ...(await _maybeEncodedRequest.getHeaders()),
            },
            body: await _maybeEncodedRequest.getBody(),
            responseType: "streaming",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return _response.body;
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Fileforge.BadRequestError(
                        await serializers.ErrorSchema.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 401:
                    throw new Fileforge.UnauthorizedError(
                        await serializers.ErrorSchema.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 500:
                    throw new Fileforge.InternalServerError(_response.error.body);
                default:
                    throw new errors.FileforgeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.FileforgeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.FileforgeTimeoutError();
            case "unknown":
                throw new errors.FileforgeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    protected async _getCustomAuthorizationHeaders() {
        const apiKeyValue = await core.Supplier.get(this._options.apiKey);
        return { "X-API-Key": apiKeyValue };
    }
}
