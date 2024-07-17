export declare type FieldValidationError = {
    /**
     * Indicates that the error occurred because a field had an invalid value
     */
    type: 'field';
    /**
     * The location within the request where this field is
     */
    location: Location;
    /**
     * The path to the field which has a validation error
     */
    path: string;
    /**
     * The value of the field
     */
    value: any;
    /**
     * The error message
     */
    msg: any;
};
export declare type UnknownFieldsError = {
    /**
     * Indicates that the error occurred because one or more fields are unknown in the request
     */
    type: 'unknown_fields';
    /**
     * The error message
     */
    msg: any;
    /**
     * The list of fields that are unknown
     */
    fields: UnknownFieldInstance[];
};
export declare type AlternativeValidationError = {
    /**
     * Indicates that the error occurred because all alternatives (e.g. in `oneOf()`) were invalid
     */
    type: 'alternative';
    /**
     * The error message
     */
    msg: any;
    /**
     * The list of underlying validation errors returned by validation chains in `oneOf()`
     */
    nestedErrors: FieldValidationError[];
};
export declare type GroupedAlternativeValidationError = {
    /**
     * Indicates that the error occurred because all alternatives (e.g. in `oneOf()`) were invalid,
     * and the nested errors are grouped per alternative.
     */
    type: 'alternative_grouped';
    /**
     * The error message
     */
    msg: any;
    /**
     * The list of underlying validation errors returned by validation chains in `oneOf()`
     */
    nestedErrors: FieldValidationError[][];
};
/**
 * A validation error as reported by a middleware.
 * The properties available in the error object vary according to the type.
 *
 * @example
 *  if (error.type === 'alternative') {
 *    console.log(`There are ${error.nestedErrors.length} errors under this alternative list`);
 *  } else if (error.type === 'field') {
 *    console.log(`There's an error with field ${error.path} in the request ${error.location}`);
 *  }
 *
 */
export declare type ValidationError = AlternativeValidationError | GroupedAlternativeValidationError | UnknownFieldsError | FieldValidationError;