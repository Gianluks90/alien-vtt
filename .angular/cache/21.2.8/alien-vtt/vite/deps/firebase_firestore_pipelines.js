import {
  CollectionReference,
  CompositeFilter,
  D,
  DocumentReference,
  F,
  FieldFilter,
  Firestore,
  FirestoreError,
  OptionsUtil,
  StructuredPipeline,
  VectorValue,
  __PRIVATE_ExpUserDataWriter,
  __PRIVATE_StructuredPipelineOptions,
  __PRIVATE_cast,
  __PRIVATE_fieldPathFromArgument,
  __PRIVATE_firestoreClientExecutePipeline,
  __PRIVATE_hardAssert,
  __PRIVATE_isCollectionGroupQuery,
  __PRIVATE_isCollectionReference,
  __PRIVATE_isDocumentQuery$1,
  __PRIVATE_isNumber$1,
  __PRIVATE_isOptionalEqual,
  __PRIVATE_isPlainObject,
  __PRIVATE_isString,
  __PRIVATE_isUserData,
  __PRIVATE_newUserDataReader,
  __PRIVATE_parseData,
  __PRIVATE_queryNormalizedOrderBy,
  __PRIVATE_toMapValue,
  __PRIVATE_toPipelineValue,
  __PRIVATE_toStringValue,
  _internalPipelineToExecutePipelineRequestProto,
  doc,
  documentId,
  ensureFirestoreConfigured,
  fail,
  refEqual,
  toNumber,
  vector
} from "./chunk-IKP33CB4.js";
import "./chunk-3NZYZMAX.js";
import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/@firebase/firestore/dist/pipelines.esm.js
function __PRIVATE_isFirestoreValue(e) {
  return "object" == typeof e && null !== e && !!("nullValue" in e && (null === e.nullValue || "NULL_VALUE" === e.nullValue) || "booleanValue" in e && (null === e.booleanValue || "boolean" == typeof e.booleanValue) || "integerValue" in e && (null === e.integerValue || "number" == typeof e.integerValue || "string" == typeof e.integerValue) || "doubleValue" in e && (null === e.doubleValue || "number" == typeof e.doubleValue) || "timestampValue" in e && (null === e.timestampValue || (function __PRIVATE_isITimestamp(e2) {
    return "object" == typeof e2 && null !== e2 && "seconds" in e2 && (null === e2.seconds || "number" == typeof e2.seconds || "string" == typeof e2.seconds) && "nanos" in e2 && (null === e2.nanos || "number" == typeof e2.nanos);
  })(e.timestampValue)) || "stringValue" in e && (null === e.stringValue || "string" == typeof e.stringValue) || "bytesValue" in e && (null === e.bytesValue || e.bytesValue instanceof Uint8Array) || "referenceValue" in e && (null === e.referenceValue || "string" == typeof e.referenceValue) || "geoPointValue" in e && (null === e.geoPointValue || (function __PRIVATE_isILatLng(e2) {
    return "object" == typeof e2 && null !== e2 && "latitude" in e2 && (null === e2.latitude || "number" == typeof e2.latitude) && "longitude" in e2 && (null === e2.longitude || "number" == typeof e2.longitude);
  })(e.geoPointValue)) || "arrayValue" in e && (null === e.arrayValue || (function __PRIVATE_isIArrayValue(e2) {
    return "object" == typeof e2 && null !== e2 && !(!("values" in e2) || null !== e2.values && !Array.isArray(e2.values));
  })(e.arrayValue)) || "mapValue" in e && (null === e.mapValue || (function __PRIVATE_isIMapValue(e2) {
    return "object" == typeof e2 && null !== e2 && !(!("fields" in e2) || null !== e2.fields && !__PRIVATE_isPlainObject(e2.fields));
  })(e.mapValue)) || "fieldReferenceValue" in e && (null === e.fieldReferenceValue || "string" == typeof e.fieldReferenceValue) || "functionValue" in e && (null === e.functionValue || (function __PRIVATE_isIFunction(e2) {
    return "object" == typeof e2 && null !== e2 && !(!("name" in e2) || null !== e2.name && "string" != typeof e2.name || !("args" in e2) || null !== e2.args && !Array.isArray(e2.args));
  })(e.functionValue)) || "pipelineValue" in e && (null === e.pipelineValue || (function __PRIVATE_isIPipeline(e2) {
    return "object" == typeof e2 && null !== e2 && !(!("stages" in e2) || null !== e2.stages && !Array.isArray(e2.stages));
  })(e.pipelineValue)));
}
function __PRIVATE_valueToDefaultExpr$1(e) {
  let n;
  return e instanceof Expression ? e : (n = __PRIVATE_isPlainObject(e) ? __PRIVATE__map(e) : e instanceof Array ? array(e) : __PRIVATE__constant(e, void 0), n);
}
function __PRIVATE_vectorToExpr$1(e) {
  if (e instanceof Expression) return e;
  if (e instanceof VectorValue) return constant(e);
  if (Array.isArray(e)) return constant(vector(e));
  throw new Error("Unsupported value: " + typeof e);
}
function __PRIVATE_fieldOrExpression$1(e) {
  if (__PRIVATE_isString(e)) {
    return field(e);
  }
  return __PRIVATE_valueToDefaultExpr$1(e);
}
var Expression = class {
  constructor() {
    this._protoValueType = "ProtoValue";
  }
  /**
   * Creates an expression that adds this expression to another expression.
   *
   * @example
   * ```typescript
   * // Add the value of the 'quantity' field and the 'reserve' field.
   * field("quantity").add(field("reserve"));
   * ```
   *
   * @param second - The expression or literal to add to this expression.
   * @param others - Optional additional expressions or literals to add to this expression.
   * @returns A new `Expression` representing the addition operation.
   */
  add(e) {
    return new FunctionExpression("add", [this, __PRIVATE_valueToDefaultExpr$1(e)], "add");
  }
  /**
   * Wraps the expression in a [BooleanExpression].
   *
   * @returns A [BooleanExpression] representing the same expression.
   */
  asBoolean() {
    if (this instanceof BooleanExpression) return this;
    if (this instanceof Constant) return new __PRIVATE_BooleanConstant(this);
    if (this instanceof Field) return new __PRIVATE_BooleanField(this);
    if (this instanceof FunctionExpression) return new __PRIVATE_BooleanFunctionExpression(this);
    throw new FirestoreError("invalid-argument", `Conversion of type ${typeof this} to BooleanExpression not supported.`);
  }
  subtract(e) {
    return new FunctionExpression("subtract", [this, __PRIVATE_valueToDefaultExpr$1(e)], "subtract");
  }
  /**
   * Creates an expression that multiplies this expression by another expression.
   *
   * @example
   * ```typescript
   * // Multiply the 'quantity' field by the 'price' field
   * field("quantity").multiply(field("price"));
   * ```
   *
   * @param second - The second expression or literal to multiply by.
   * @param others - Optional additional expressions or literals to multiply by.
   * @returns A new `Expression` representing the multiplication operation.
   */
  multiply(e) {
    return new FunctionExpression("multiply", [this, __PRIVATE_valueToDefaultExpr$1(e)], "multiply");
  }
  divide(e) {
    return new FunctionExpression("divide", [this, __PRIVATE_valueToDefaultExpr$1(e)], "divide");
  }
  mod(e) {
    return new FunctionExpression("mod", [this, __PRIVATE_valueToDefaultExpr$1(e)], "mod");
  }
  equal(e) {
    return new FunctionExpression("equal", [this, __PRIVATE_valueToDefaultExpr$1(e)], "equal").asBoolean();
  }
  notEqual(e) {
    return new FunctionExpression("not_equal", [this, __PRIVATE_valueToDefaultExpr$1(e)], "notEqual").asBoolean();
  }
  lessThan(e) {
    return new FunctionExpression("less_than", [this, __PRIVATE_valueToDefaultExpr$1(e)], "lessThan").asBoolean();
  }
  lessThanOrEqual(e) {
    return new FunctionExpression("less_than_or_equal", [this, __PRIVATE_valueToDefaultExpr$1(e)], "lessThanOrEqual").asBoolean();
  }
  greaterThan(e) {
    return new FunctionExpression("greater_than", [this, __PRIVATE_valueToDefaultExpr$1(e)], "greaterThan").asBoolean();
  }
  greaterThanOrEqual(e) {
    return new FunctionExpression("greater_than_or_equal", [this, __PRIVATE_valueToDefaultExpr$1(e)], "greaterThanOrEqual").asBoolean();
  }
  /**
   * Creates an expression that concatenates an array expression with one or more other arrays.
   *
   * @example
   * ```typescript
   * // Combine the 'items' array with another array field.
   * field("items").arrayConcat(field("otherItems"));
   * ```
   * @param secondArray - Second array expression or array literal to concatenate.
   * @param otherArrays - Optional additional array expressions or array literals to concatenate.
   * @returns A new `Expression` representing the concatenated array.
   */
  arrayConcat(e, ...n) {
    const t = [e, ...n].map(((e2) => __PRIVATE_valueToDefaultExpr$1(e2)));
    return new FunctionExpression("array_concat", [this, ...t], "arrayConcat");
  }
  arrayContains(e) {
    return new FunctionExpression("array_contains", [this, __PRIVATE_valueToDefaultExpr$1(e)], "arrayContains").asBoolean();
  }
  arrayContainsAll(e) {
    const n = Array.isArray(e) ? new __PRIVATE_ListOfExprs(e.map(__PRIVATE_valueToDefaultExpr$1), "arrayContainsAll") : e;
    return new FunctionExpression("array_contains_all", [this, n], "arrayContainsAll").asBoolean();
  }
  arrayContainsAny(e) {
    const n = Array.isArray(e) ? new __PRIVATE_ListOfExprs(e.map(__PRIVATE_valueToDefaultExpr$1), "arrayContainsAny") : e;
    return new FunctionExpression("array_contains_any", [this, n], "arrayContainsAny").asBoolean();
  }
  /**
   * Creates an expression that reverses an array.
   *
   * @example
   * ```typescript
   * // Reverse the value of the 'myArray' field.
   * field("myArray").arrayReverse();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the reversed array.
   */
  arrayReverse() {
    return new FunctionExpression("array_reverse", [this]);
  }
  /**
   * Creates an expression that calculates the length of an array.
   *
   * @example
   * ```typescript
   * // Get the number of items in the 'cart' array
   * field("cart").arrayLength();
   * ```
   *
   * @returns A new `Expression` representing the length of the array.
   */
  arrayLength() {
    return new FunctionExpression("array_length", [this], "arrayLength");
  }
  equalAny(e) {
    const n = Array.isArray(e) ? new __PRIVATE_ListOfExprs(e.map(__PRIVATE_valueToDefaultExpr$1), "equalAny") : e;
    return new FunctionExpression("equal_any", [this, n], "equalAny").asBoolean();
  }
  notEqualAny(e) {
    const n = Array.isArray(e) ? new __PRIVATE_ListOfExprs(e.map(__PRIVATE_valueToDefaultExpr$1), "notEqualAny") : e;
    return new FunctionExpression("not_equal_any", [this, n], "notEqualAny").asBoolean();
  }
  /**
   * Creates an expression that checks if a field exists in the document.
   *
   * @example
   * ```typescript
   * // Check if the document has a field named "phoneNumber"
   * field("phoneNumber").exists();
   * ```
   *
   * @returns A new `Expression` representing the 'exists' check.
   */
  exists() {
    return new FunctionExpression("exists", [this], "exists").asBoolean();
  }
  /**
   * Creates an expression that calculates the character length of a string in UTF-8.
   *
   * @example
   * ```typescript
   * // Get the character length of the 'name' field in its UTF-8 form.
   * field("name").charLength();
   * ```
   *
   * @returns A new `Expression` representing the length of the string.
   */
  charLength() {
    return new FunctionExpression("char_length", [this], "charLength");
  }
  like(e) {
    return new FunctionExpression("like", [this, __PRIVATE_valueToDefaultExpr$1(e)], "like").asBoolean();
  }
  regexContains(e) {
    return new FunctionExpression("regex_contains", [this, __PRIVATE_valueToDefaultExpr$1(e)], "regexContains").asBoolean();
  }
  regexFind(e) {
    return new FunctionExpression("regex_find", [this, __PRIVATE_valueToDefaultExpr$1(e)], "regexFind");
  }
  regexFindAll(e) {
    return new FunctionExpression("regex_find_all", [this, __PRIVATE_valueToDefaultExpr$1(e)], "regexFindAll");
  }
  regexMatch(e) {
    return new FunctionExpression("regex_match", [this, __PRIVATE_valueToDefaultExpr$1(e)], "regexMatch").asBoolean();
  }
  stringContains(e) {
    return new FunctionExpression("string_contains", [this, __PRIVATE_valueToDefaultExpr$1(e)], "stringContains").asBoolean();
  }
  startsWith(e) {
    return new FunctionExpression("starts_with", [this, __PRIVATE_valueToDefaultExpr$1(e)], "startsWith").asBoolean();
  }
  endsWith(e) {
    return new FunctionExpression("ends_with", [this, __PRIVATE_valueToDefaultExpr$1(e)], "endsWith").asBoolean();
  }
  /**
   * Creates an expression that converts a string to lowercase.
   *
   * @example
   * ```typescript
   * // Convert the 'name' field to lowercase
   * field("name").toLower();
   * ```
   *
   * @returns A new `Expression` representing the lowercase string.
   */
  toLower() {
    return new FunctionExpression("to_lower", [this], "toLower");
  }
  /**
   * Creates an expression that converts a string to uppercase.
   *
   * @example
   * ```typescript
   * // Convert the 'title' field to uppercase
   * field("title").toUpper();
   * ```
   *
   * @returns A new `Expression` representing the uppercase string.
   */
  toUpper() {
    return new FunctionExpression("to_upper", [this], "toUpper");
  }
  /**
   * Creates an expression that removes leading and trailing characters from a string or byte array.
   *
   * @example
   * ```typescript
   * // Trim whitespace from the 'userInput' field
   * field("userInput").trim();
   *
   * // Trim quotes from the 'userInput' field
   * field("userInput").trim('"');
   * ```
   * @param valueToTrim - Optional This parameter is treated as a set of characters or bytes that will be
   * trimmed from the input. If not specified, then whitespace will be trimmed.
   * @returns A new `Expression` representing the trimmed string or byte array.
   */
  trim(e) {
    const n = [this];
    return e && n.push(__PRIVATE_valueToDefaultExpr$1(e)), new FunctionExpression("trim", n, "trim");
  }
  /**
   * Trims whitespace or a specified set of characters/bytes from the beginning of a string or byte array.
   *
   * @example
   * ```typescript
   * // Trim whitespace from the beginning of the 'userInput' field
   * field("userInput").ltrim();
   *
   * // Trim quotes from the beginning of the 'userInput' field
   * field("userInput").ltrim('"');
   * ```
   *
   * @param valueToTrim - Optional. A string or byte array containing the characters/bytes to trim.
   * If not specified, whitespace will be trimmed.
   * @returns A new `Expression` representing the trimmed string.
   */
  ltrim(e) {
    const n = [this];
    return e && n.push(__PRIVATE_valueToDefaultExpr$1(e)), new FunctionExpression("ltrim", n, "ltrim");
  }
  /**
   * Trims whitespace or a specified set of characters/bytes from the end of a string or byte array.
   *
   * @example
   * ```typescript
   * // Trim whitespace from the end of the 'userInput' field
   * field("userInput").rtrim();
   *
   * // Trim quotes from the end of the 'userInput' field
   * field("userInput").rtrim('"');
   * ```
   *
   * @param valueToTrim - Optional. A string or byte array containing the characters/bytes to trim.
   * If not specified, whitespace will be trimmed.
   * @returns A new `Expression` representing the trimmed string or byte array.
   */
  rtrim(e) {
    const n = [this];
    return e && n.push(__PRIVATE_valueToDefaultExpr$1(e)), new FunctionExpression("rtrim", n, "rtrim");
  }
  /**
   * Creates an expression that returns the data type of this expression's result, as a string.
   *
   * @remarks
   * This is evaluated on the backend. This means:
   * 1. Generic typed elements (like `array<string>`) evaluate strictly to the primitive `'array'`.
   * 2. Any custom `FirestoreDataConverter` mappings are ignored.
   * 3. For numeric values, the backend does not yield the JavaScript `"number"` type; it evaluates
   *    precisely as `"int64"` or `"float64"`.
   * 4. For date or timestamp objects, the backend evaluates to `"timestamp"`.
   *
   * @example
   * ```typescript
   * // Get the data type of the value in field 'title'
   * field('title').type()
   * ```
   *
   * @returns A new `Expression` representing the data type.
   */
  type() {
    return new FunctionExpression("type", [this]);
  }
  /**
   * Creates an expression that checks if the result of this expression is of the given type.
   *
   * @remarks Null or undefined fields evaluate to skip/error. Use `ifAbsent()` / `isAbsent()` to evaluate missing data.
   * Supported values for `type` are:
   * `'null'`, `'array'`, `'boolean'`, `'bytes'`, `'timestamp'`, `'geo_point'`, `'number'`,
   * `'int32'`, `'int64'`, `'float64'`, `'decimal128'`, `'map'`, `'reference'`, `'string'`,
   * `'vector'`, `'max_key'`, `'min_key'`, `'object_id'`, `'regex'`, `'request_timestamp'`.
   *
   * @example
   * ```typescript
   * // Check if the 'price' field is specifically an integer (not just 'number')
   * field('price').isType('int64');
   * ```
   *
   * @param type - The type to check for.
   * @returns A new `BooleanExpression` that evaluates to true if the expression's result is of the given type, false otherwise.
   */
  isType(e) {
    return new FunctionExpression("is_type", [this, constant(e)], "isType").asBoolean();
  }
  /**
   * Creates an expression that concatenates string expressions together.
   *
   * @example
   * ```typescript
   * // Combine the 'firstName', " ", and 'lastName' fields into a single string
   * field("firstName").stringConcat(constant(" "), field("lastName"));
   * ```
   *
   * @param secondString - The additional expression or string literal to concatenate.
   * @param otherStrings - Optional additional expressions or string literals to concatenate.
   * @returns A new `Expression` representing the concatenated string.
   */
  stringConcat(e, ...n) {
    const t = [e, ...n].map(__PRIVATE_valueToDefaultExpr$1);
    return new FunctionExpression("string_concat", [this, ...t], "stringConcat");
  }
  /**
   * Creates an expression that finds the index of the first occurrence of a substring or byte sequence.
   *
   * @example
   * ```typescript
   * // Find the index of "foo" in the 'text' field
   * field("text").stringIndexOf("foo");
   * ```
   *
   * @param search - The substring or byte sequence to search for.
   * @returns A new `Expression` representing the index of the first occurrence.
   */
  stringIndexOf(e) {
    return new FunctionExpression("string_index_of", [this, __PRIVATE_valueToDefaultExpr$1(e)], "stringIndexOf");
  }
  /**
   * Creates an expression that repeats a string or byte array a specified number of times.
   *
   * @example
   * ```typescript
   * // Repeat the 'label' field 3 times
   * field("label").stringRepeat(3);
   * ```
   *
   * @param repetitions - The number of times to repeat the string or byte array.
   * @returns A new `Expression` representing the repeated string or byte array.
   */
  stringRepeat(e) {
    return new FunctionExpression("string_repeat", [this, __PRIVATE_valueToDefaultExpr$1(e)], "stringRepeat");
  }
  /**
   * Creates an expression that replaces all occurrences of a substring or byte sequence with a replacement.
   *
   * @example
   * ```typescript
   * // Replace all occurrences of "foo" with "bar" in the 'text' field
   * field("text").stringReplaceAll("foo", "bar");
   * ```
   *
   * @param find - The substring or byte sequence to search for.
   * @param replacement - The replacement string or byte sequence.
   * @returns A new `Expression` representing the string or byte array with replacements.
   */
  stringReplaceAll(e, n) {
    return new FunctionExpression("string_replace_all", [this, __PRIVATE_valueToDefaultExpr$1(e), __PRIVATE_valueToDefaultExpr$1(n)], "stringReplaceAll");
  }
  /**
   * Creates an expression that replaces the first occurrence of a substring or byte sequence with a replacement.
   *
   * @example
   * ```typescript
   * // Replace the first occurrence of "foo" with "bar" in the 'text' field
   * field("text").stringReplaceOne("foo", "bar");
   * ```
   *
   * @param find - The substring or byte sequence to search for.
   * @param replacement - The replacement string or byte sequence.
   * @returns A new `Expression` representing the string or byte array with the replacement.
   */
  stringReplaceOne(e, n) {
    return new FunctionExpression("string_replace_one", [this, __PRIVATE_valueToDefaultExpr$1(e), __PRIVATE_valueToDefaultExpr$1(n)], "stringReplaceOne");
  }
  /**
   * Creates an expression that concatenates expression results together.
   *
   * @example
   * ```typescript
   * // Combine the 'firstName', ' ', and 'lastName' fields into a single value.
   * field("firstName").concat(constant(" "), field("lastName"));
   * ```
   *
   * @param second - The additional expression or literal to concatenate.
   * @param others - Optional additional expressions or literals to concatenate.
   * @returns A new `Expression` representing the concatenated value.
   */
  concat(e, ...n) {
    const t = [e, ...n].map(__PRIVATE_valueToDefaultExpr$1);
    return new FunctionExpression("concat", [this, ...t], "concat");
  }
  /**
   * Creates an expression that reverses this string expression.
   *
   * @example
   * ```typescript
   * // Reverse the value of the 'myString' field.
   * field("myString").reverse();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the reversed string.
   */
  reverse() {
    return new FunctionExpression("reverse", [this], "reverse");
  }
  /**
   * Filters the array using a provided alias and predicate expression.
   *
   * @example
   * ```typescript
   * // Filter the 'items' array to only include those where the 'price' is greater than 10
   * field("items").arrayFilter('item', greaterThan(variable('item.price'), 10));
   * ```
   *
   * @param alias - The variable name to use for each element.
   * @param filter - The predicate boolean expression to filter by.
   * @returns A new `Expression` representing the filtered array.
   */
  arrayFilter(e, n) {
    return new FunctionExpression("array_filter", [this, __PRIVATE_valueToDefaultExpr$1(e), n], "arrayFilter");
  }
  /**
   * Creates an expression that applies a provided transformation to each element in an array.
   *
   * @example
   * ```typescript
   * // Transform the 'scores' array by multiplying each score by 10
   * field("scores").arrayTransform("score", multiply(variable("score"), 10));
   * ```
   *
   * @param elementAlias - The variable name to use for each element.
   * @param transform - The lambda expression used to transform the elements.
   * @returns A new `Expression` representing the arrayTransform operation.
   */
  arrayTransform(e, n) {
    return new FunctionExpression("array_transform", [this, __PRIVATE_valueToDefaultExpr$1(e), n], "arrayTransform");
  }
  /**
   * Creates an expression that applies a provided transformation to each element in an array, providing the element's index to the transformation expression.
   *
   * @example
   * ```typescript
   * // Transform the 'scores' array by adding the index to each score
   * field("scores").arrayTransformWithIndex("score", "i", add(variable("score"), variable("i")));
   * ```
   *
   * @param elementAlias - The variable name to use for each element.
   * @param indexAlias - The variable name to use for the current index.
   * @param transform - The lambda expression used to transform the elements.
   * @returns A new `Expression` representing the arrayTransformWithIndex operation.
   */
  arrayTransformWithIndex(e, n, t) {
    return new FunctionExpression("array_transform", [this, __PRIVATE_valueToDefaultExpr$1(e), __PRIVATE_valueToDefaultExpr$1(n), t], "arrayTransformWithIndex");
  }
  /**
   * Returns a subset of the array.
   *
   * @example
   * ```typescript
   * // Get 5 elements from the 'items' array starting from index 2
   * field("items").arraySlice(2, 5);
   *
   * // Get n number of elements from the 'items' array starting from index 2
   * field("items").arraySlice(2, field("count"));
   * ```
   *
   * @param offset - The starting offset.
   * @param length - The optional length of the slice.
   * @returns A new `Expression` representing the sliced array.
   */
  arraySlice(e, n) {
    const t = [this, __PRIVATE_valueToDefaultExpr$1(e)];
    return void 0 !== n && t.push(__PRIVATE_valueToDefaultExpr$1(n)), new FunctionExpression("array_slice", t, "arraySlice");
  }
  /**
   * Returns the first element of the array.
   *
   * @example
   * ```typescript
   * // Get the first element of the 'myArray' field.
   * field("myArray").arrayFirst();
   * ```
   *
   * @returns A new `Expression` representing the first element.
   */
  arrayFirst() {
    return new FunctionExpression("array_first", [this], "arrayFirst");
  }
  arrayFirstN(e) {
    return new FunctionExpression("array_first_n", [this, __PRIVATE_valueToDefaultExpr$1(e)], "arrayFirstN");
  }
  /**
   * Returns the last element of the array.
   *
   * @example
   * ```typescript
   * // Get the last element of the 'myArray' field.
   * field("myArray").arrayLast();
   * ```
   *
   * @returns A new `Expression` representing the last element.
   */
  arrayLast() {
    return new FunctionExpression("array_last", [this], "arrayLast");
  }
  arrayLastN(e) {
    return new FunctionExpression("array_last_n", [this, __PRIVATE_valueToDefaultExpr$1(e)], "arrayLastN");
  }
  /**
   * Returns the maximum value in the array.
   *
   * @example
   * ```typescript
   * // Get the maximum value of the 'myArray' field.
   * field("myArray").arrayMaximum();
   * ```
   *
   * @returns A new `Expression` representing the maximum value.
   */
  arrayMaximum() {
    return new FunctionExpression("maximum", [this], "arrayMaximum");
  }
  arrayMaximumN(e) {
    return new FunctionExpression("maximum_n", [this, __PRIVATE_valueToDefaultExpr$1(e)], "arrayMaximumN");
  }
  /**
   * Returns the minimum value in the array.
   *
   * @example
   * ```typescript
   * // Get the minimum value of the 'myArray' field.
   * field("myArray").arrayMinimum();
   * ```
   *
   * @returns A new `Expression` representing the minimum value.
   */
  arrayMinimum() {
    return new FunctionExpression("minimum", [this], "arrayMinimum");
  }
  arrayMinimumN(e) {
    return new FunctionExpression("minimum_n", [this, __PRIVATE_valueToDefaultExpr$1(e)], "arrayMinimumN");
  }
  arrayIndexOf(e) {
    return new FunctionExpression("array_index_of", [this, __PRIVATE_valueToDefaultExpr$1(e), __PRIVATE_valueToDefaultExpr$1("first")], "arrayIndexOf");
  }
  arrayLastIndexOf(e) {
    return new FunctionExpression("array_index_of", [this, __PRIVATE_valueToDefaultExpr$1(e), __PRIVATE_valueToDefaultExpr$1("last")], "arrayLastIndexOf");
  }
  arrayIndexOfAll(e) {
    return new FunctionExpression("array_index_of_all", [this, __PRIVATE_valueToDefaultExpr$1(e)], "arrayIndexOfAll");
  }
  /**
   * Creates an expression that calculates the length of this string expression in bytes.
   *
   * @example
   * ```typescript
   * // Calculate the length of the 'myString' field in bytes.
   * field("myString").byteLength();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the length of the string in bytes.
   */
  byteLength() {
    return new FunctionExpression("byte_length", [this], "byteLength");
  }
  /**
   * Creates an expression that computes the ceiling of a numeric value.
   *
   * @example
   * ```typescript
   * // Compute the ceiling of the 'price' field.
   * field("price").ceil();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the ceiling of the numeric value.
   */
  ceil() {
    return new FunctionExpression("ceil", [this]);
  }
  /**
   * Creates an expression that computes the floor of a numeric value.
   *
   * @example
   * ```typescript
   * // Compute the floor of the 'price' field.
   * field("price").floor();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the floor of the numeric value.
   */
  floor() {
    return new FunctionExpression("floor", [this]);
  }
  /**
   * Creates an expression that computes the absolute value of a numeric value.
   *
   * @example
   * ```typescript
   * // Compute the absolute value of the 'price' field.
   * field("price").abs();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the absolute value of the numeric value.
   */
  abs() {
    return new FunctionExpression("abs", [this]);
  }
  /**
   * Creates an expression that computes e to the power of this expression.
   *
   * @example
   * ```typescript
   * // Compute e to the power of the 'value' field.
   * field("value").exp();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the exp of the numeric value.
   */
  exp() {
    return new FunctionExpression("exp", [this]);
  }
  /**
   * Accesses a value from a map (object) field using the provided key.
   *
   * @example
   * ```typescript
   * // Get the 'city' value from the 'address' map field
   * field("address").mapGet("city");
   * ```
   *
   * @param subfield - The key to access in the map.
   * @returns A new `Expression` representing the value associated with the given key in the map.
   */
  mapGet(e) {
    return new FunctionExpression("map_get", [this, constant(e)], "mapGet");
  }
  /**
   * Creates an expression that returns a new map with the specified entries added or updated.
   *
   * @remarks
   * Note that `mapSet` only performs shallow updates to the map. Setting a value to `null`
   * will retain the key with a `null` value. To remove a key entirely, use `mapRemove`.
   *
   * @example
   * ```typescript
   * // Set the 'city' to "San Francisco" in the 'address' map
   * field("address").mapSet("city", "San Francisco");
   * ```
   *
   * @param key - The key to set. Must be a string or a constant string expression.
   * @param value - The value to set.
   * @param moreKeyValues - Additional key-value pairs to set.
   * @returns A new `Expression` representing the map with the entries set.
   */
  mapSet(e, n, ...t) {
    const r = [this, __PRIVATE_valueToDefaultExpr$1(e), __PRIVATE_valueToDefaultExpr$1(n), ...t.map(__PRIVATE_valueToDefaultExpr$1)];
    return new FunctionExpression("map_set", r, "mapSet");
  }
  /**
   * Creates an expression that returns the keys of a map.
   *
   * @remarks
   * While the backend generally preserves insertion order, relying on the
   * order of the output array is not guaranteed and should be avoided.
   *
   * @example
   * ```typescript
   * // Get the keys of the 'address' map
   * field("address").mapKeys();
   * ```
   *
   * @returns A new `Expression` representing the keys of the map.
   */
  mapKeys() {
    return new FunctionExpression("map_keys", [this], "mapKeys");
  }
  /**
   * Creates an expression that returns the values of a map.
   *
   * @remarks
   * While the backend generally preserves insertion order, relying on the
   * order of the output array is not guaranteed and should be avoided.
   *
   * @example
   * ```typescript
   * // Get the values of the 'address' map
   * field("address").mapValues();
   * ```
   *
   * @returns A new `Expression` representing the values of the map.
   */
  mapValues() {
    return new FunctionExpression("map_values", [this], "mapValues");
  }
  /**
   * Creates an expression that returns the entries of a map as an array of maps,
   * where each map contains a `"k"` property for the key and a `"v"` property for the value.
   * For example: `[{ k: "key1", v: "value1" }, ...]`.
   *
   * @example
   * ```typescript
   * // Get the entries of the 'address' map
   * field("address").mapEntries();
   * ```
   *
   * @returns A new `Expression` representing the entries of the map.
   */
  mapEntries() {
    return new FunctionExpression("map_entries", [this], "mapEntries");
  }
  /**
   * @public
   * Creates an expression that returns the value of a field from the document that results from the evaluation of this expression.
   *
   * @example
   * ```typescript
   * // Get the value of the "city" field in the "address" document.
   * field("address").getField("city")
   * ```
   *
   * @param key The field to access in the document.
   * @returns A new `Expression` representing the value of the field in the document.
   */
  getField(e) {
    return new FunctionExpression("get_field", [this, __PRIVATE_valueToDefaultExpr$1(e)], "get_field");
  }
  /**
   * Creates an aggregation that counts the number of stage inputs with valid evaluations of the
   * expression or field.
   *
   * @example
   * ```typescript
   * // Count the total number of products
   * field("productId").count().as("totalProducts");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'count' aggregation.
   */
  count() {
    return AggregateFunction._create("count", [this], "count");
  }
  /**
   * Creates an aggregation that calculates the sum of a numeric field across multiple stage inputs.
   *
   * @example
   * ```typescript
   * // Calculate the total revenue from a set of orders
   * field("orderAmount").sum().as("totalRevenue");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'sum' aggregation.
   */
  sum() {
    return AggregateFunction._create("sum", [this], "sum");
  }
  /**
   * Creates an aggregation that calculates the average (mean) of a numeric field across multiple
   * stage inputs.
   *
   * @example
   * ```typescript
   * // Calculate the average age of users
   * field("age").average().as("averageAge");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'average' aggregation.
   */
  average() {
    return AggregateFunction._create("average", [this], "average");
  }
  /**
   * Creates an aggregation that finds the minimum value of a field across multiple stage inputs.
   *
   * @example
   * ```typescript
   * // Find the lowest price of all products
   * field("price").minimum().as("lowestPrice");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'minimum' aggregation.
   */
  minimum() {
    return AggregateFunction._create("minimum", [this], "minimum");
  }
  /**
   * Creates an aggregation that finds the maximum value of a field across multiple stage inputs.
   *
   * @example
   * ```typescript
   * // Find the highest score in a leaderboard
   * field("score").maximum().as("highestScore");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'maximum' aggregation.
   */
  maximum() {
    return AggregateFunction._create("maximum", [this], "maximum");
  }
  /**
   * Creates an aggregation that finds the first value of an expression across multiple stage inputs.
   *
   * @example
   * ```typescript
   * // Find the first value of the 'rating' field
   * field("rating").first().as("firstRating");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'first' aggregation.
   */
  first() {
    return AggregateFunction._create("first", [this], "first");
  }
  /**
   * Creates an aggregation that finds the last value of an expression across multiple stage inputs.
   *
   * @example
   * ```typescript
   * // Find the last value of the 'rating' field
   * field("rating").last().as("lastRating");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'last' aggregation.
   */
  last() {
    return AggregateFunction._create("last", [this], "last");
  }
  /**
   * Creates an aggregation that collects all values of an expression across multiple stage inputs
   * into an array.
   *
   * @remarks
   * If the expression resolves to an absent value, it is converted to `null`.
   * The order of elements in the output array is not stable and shouldn't be relied upon.
   *
   * @example
   * ```typescript
   * // Collect all tags from books into an array
   * field("tags").arrayAgg().as("allTags");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'array_agg' aggregation.
   */
  arrayAgg() {
    return AggregateFunction._create("array_agg", [this], "arrayAgg");
  }
  /**
   * Creates an aggregation that collects all distinct values of an expression across multiple stage
   * inputs into an array.
   *
   * @remarks
   * If the expression resolves to an absent value, it is converted to `null`.
   * The order of elements in the output array is not stable and shouldn't be relied upon.
   *
   * @example
   * ```typescript
   * // Collect all distinct tags from books into an array
   * field("tags").arrayAggDistinct().as("allDistinctTags");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'array_agg_distinct' aggregation.
   */
  arrayAggDistinct() {
    return AggregateFunction._create("array_agg_distinct", [this], "arrayAggDistinct");
  }
  /**
   * Creates an aggregation that counts the number of distinct values of the expression or field.
   *
   * @example
   * ```typescript
   * // Count the distinct number of products
   * field("productId").countDistinct().as("distinctProducts");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'count_distinct' aggregation.
   */
  countDistinct() {
    return AggregateFunction._create("count_distinct", [this], "countDistinct");
  }
  /**
   * Creates an expression that returns the larger value between this expression and another expression, based on Firestore's value type ordering.
   *
   * @example
   * ```typescript
   * // Returns the larger value between the 'timestamp' field and the current timestamp.
   * field("timestamp").logicalMaximum(currentTimestamp());
   * ```
   *
   * @param second - The second expression or literal to compare with.
   * @param others - Optional additional expressions or literals to compare with.
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the logical maximum operation.
   */
  logicalMaximum(e, ...n) {
    const t = [e, ...n];
    return new FunctionExpression("maximum", [this, ...t.map(__PRIVATE_valueToDefaultExpr$1)], "logicalMaximum");
  }
  /**
   * Creates an expression that returns the smaller value between this expression and another expression, based on Firestore's value type ordering.
   *
   * @example
   * ```typescript
   * // Returns the smaller value between the 'timestamp' field and the current timestamp.
   * field("timestamp").logicalMinimum(currentTimestamp());
   * ```
   *
   * @param second - The second expression or literal to compare with.
   * @param others - Optional additional expressions or literals to compare with.
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the logical minimum operation.
   */
  logicalMinimum(e, ...n) {
    const t = [e, ...n];
    return new FunctionExpression("minimum", [this, ...t.map(__PRIVATE_valueToDefaultExpr$1)], "minimum");
  }
  /**
   * Creates an expression that calculates the length (number of dimensions) of this Firestore Vector expression.
   *
   * @example
   * ```typescript
   * // Get the vector length (dimension) of the field 'embedding'.
   * field("embedding").vectorLength();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the length of the vector.
   */
  vectorLength() {
    return new FunctionExpression("vector_length", [this], "vectorLength");
  }
  cosineDistance(e) {
    return new FunctionExpression("cosine_distance", [this, __PRIVATE_vectorToExpr$1(e)], "cosineDistance");
  }
  dotProduct(e) {
    return new FunctionExpression("dot_product", [this, __PRIVATE_vectorToExpr$1(e)], "dotProduct");
  }
  euclideanDistance(e) {
    return new FunctionExpression("euclidean_distance", [this, __PRIVATE_vectorToExpr$1(e)], "euclideanDistance");
  }
  /**
   * Creates an expression that interprets this expression as the number of microseconds since the Unix epoch (1970-01-01 00:00:00 UTC)
   * and returns a timestamp.
   *
   * @example
   * ```typescript
   * // Interpret the 'microseconds' field as microseconds since epoch.
   * field("microseconds").unixMicrosToTimestamp();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the timestamp.
   */
  unixMicrosToTimestamp() {
    return new FunctionExpression("unix_micros_to_timestamp", [this], "unixMicrosToTimestamp");
  }
  /**
   * Creates an expression that converts this timestamp expression to the number of microseconds since the Unix epoch (1970-01-01 00:00:00 UTC).
   *
   * @example
   * ```typescript
   * // Convert the 'timestamp' field to microseconds since epoch.
   * field("timestamp").timestampToUnixMicros();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the number of microseconds since epoch.
   */
  timestampToUnixMicros() {
    return new FunctionExpression("timestamp_to_unix_micros", [this], "timestampToUnixMicros");
  }
  /**
   * Creates an expression that interprets this expression as the number of milliseconds since the Unix epoch (1970-01-01 00:00:00 UTC)
   * and returns a timestamp.
   *
   * @example
   * ```typescript
   * // Interpret the 'milliseconds' field as milliseconds since epoch.
   * field("milliseconds").unixMillisToTimestamp();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the timestamp.
   */
  unixMillisToTimestamp() {
    return new FunctionExpression("unix_millis_to_timestamp", [this], "unixMillisToTimestamp");
  }
  /**
   * Creates an expression that converts this timestamp expression to the number of milliseconds since the Unix epoch (1970-01-01 00:00:00 UTC).
   *
   * @example
   * ```typescript
   * // Convert the 'timestamp' field to milliseconds since epoch.
   * field("timestamp").timestampToUnixMillis();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the number of milliseconds since epoch.
   */
  timestampToUnixMillis() {
    return new FunctionExpression("timestamp_to_unix_millis", [this], "timestampToUnixMillis");
  }
  /**
   * Creates an expression that interprets this expression as the number of seconds since the Unix epoch (1970-01-01 00:00:00 UTC)
   * and returns a timestamp.
   *
   * @example
   * ```typescript
   * // Interpret the 'seconds' field as seconds since epoch.
   * field("seconds").unixSecondsToTimestamp();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the timestamp.
   */
  unixSecondsToTimestamp() {
    return new FunctionExpression("unix_seconds_to_timestamp", [this], "unixSecondsToTimestamp");
  }
  /**
   * Creates an expression that converts this timestamp expression to the number of seconds since the Unix epoch (1970-01-01 00:00:00 UTC).
   *
   * @example
   * ```typescript
   * // Convert the 'timestamp' field to seconds since epoch.
   * field("timestamp").timestampToUnixSeconds();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the number of seconds since epoch.
   */
  timestampToUnixSeconds() {
    return new FunctionExpression("timestamp_to_unix_seconds", [this], "timestampToUnixSeconds");
  }
  timestampAdd(e, n) {
    return new FunctionExpression("timestamp_add", [this, __PRIVATE_valueToDefaultExpr$1(e), __PRIVATE_valueToDefaultExpr$1(n)], "timestampAdd");
  }
  timestampSubtract(e, n) {
    return new FunctionExpression("timestamp_subtract", [this, __PRIVATE_valueToDefaultExpr$1(e), __PRIVATE_valueToDefaultExpr$1(n)], "timestampSubtract");
  }
  timestampDiff(e, n) {
    return new FunctionExpression("timestamp_diff", [this, __PRIVATE_fieldOrExpression$1(e), __PRIVATE_valueToDefaultExpr$1(n)], "timestampDiff");
  }
  timestampExtract(e, n) {
    const t = [this, __PRIVATE_valueToDefaultExpr$1(e)];
    return n && t.push(__PRIVATE_valueToDefaultExpr$1(n)), new FunctionExpression("timestamp_extract", t, "timestampExtract");
  }
  /**
   *
   * Creates an expression that returns the document ID from a path.
   *
   * @example
   * ```typescript
   * // Get the document ID from a path.
   * field("__path__").documentId();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the documentId operation.
   */
  documentId() {
    return new FunctionExpression("document_id", [this], "documentId");
  }
  /**
   *
   * Creates an expression that returns the parent document reference of a document reference.
   *
   * @example
   * ```typescript
   * // Get the parent document reference of a document reference.
   * field("__path__").parent();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the parent operation.
   */
  parent() {
    return new FunctionExpression("parent", [this], "parent");
  }
  substring(e, n) {
    const t = __PRIVATE_valueToDefaultExpr$1(e);
    return new FunctionExpression("substring", void 0 === n ? [this, t] : [this, t, __PRIVATE_valueToDefaultExpr$1(n)], "substring");
  }
  arrayGet(e) {
    return new FunctionExpression("array_get", [this, __PRIVATE_valueToDefaultExpr$1(e)], "arrayGet");
  }
  /**
   *
   * Creates an expression that checks if a given expression produces an error.
   *
   * @example
   * ```typescript
   * // Check if the result of a calculation is an error
   * field("title").arrayContains(1).isError();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#BooleanExpression} representing the 'isError' check.
   */
  isError() {
    return new FunctionExpression("is_error", [this], "isError").asBoolean();
  }
  ifError(e) {
    const n = new FunctionExpression("if_error", [this, __PRIVATE_valueToDefaultExpr$1(e)], "ifError");
    return e instanceof BooleanExpression ? n.asBoolean() : n;
  }
  /**
   *
   * Creates an expression that returns `true` if the result of this expression
   * is absent. Otherwise, returns `false` even if the value is `null`.
   *
   * @example
   * ```typescript
   * // Check if the field `value` is absent.
   * field("value").isAbsent();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#BooleanExpression} representing the 'isAbsent' check.
   */
  isAbsent() {
    return new FunctionExpression("is_absent", [this], "isAbsent").asBoolean();
  }
  mapRemove(e) {
    return new FunctionExpression("map_remove", [this, __PRIVATE_valueToDefaultExpr$1(e)], "mapRemove");
  }
  /**
   *
   * Creates an expression that merges multiple map values.
   *
   * @example
   * ```
   * // Merges the map in the settings field with, a map literal, and a map in
   * // that is conditionally returned by another expression
   * field('settings').mapMerge({ enabled: true }, conditional(field('isAdmin'), { admin: true}, {})
   * ```
   *
   * @param secondMap - A required second map to merge. Represented as a literal or
   * an expression that returns a map.
   * @param otherMaps - Optional additional maps to merge. Each map is represented
   * as a literal or an expression that returns a map.
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the 'mapMerge' operation.
   */
  mapMerge(e, ...n) {
    const t = __PRIVATE_valueToDefaultExpr$1(e), r = n.map(__PRIVATE_valueToDefaultExpr$1);
    return new FunctionExpression("map_merge", [this, t, ...r], "mapMerge");
  }
  pow(e) {
    return new FunctionExpression("pow", [this, __PRIVATE_valueToDefaultExpr$1(e)]);
  }
  trunc(e) {
    return void 0 === e ? new FunctionExpression("trunc", [this]) : new FunctionExpression("trunc", [this, __PRIVATE_valueToDefaultExpr$1(e)], "trunc");
  }
  round(e) {
    return void 0 === e ? new FunctionExpression("round", [this]) : new FunctionExpression("round", [this, __PRIVATE_valueToDefaultExpr$1(e)], "round");
  }
  /**
   * Creates an expression that returns the collection ID from a path.
   *
   * @example
   * ```typescript
   * // Get the collection ID from a path.
   * field("__path__").collectionId();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the collectionId operation.
   */
  collectionId() {
    return new FunctionExpression("collection_id", [this]);
  }
  /**
   * Creates an expression that calculates the length of a string, array, map, vector, or bytes.
   *
   * @example
   * ```typescript
   * // Get the length of the 'name' field.
   * field("name").length();
   *
   * // Get the number of items in the 'cart' array.
   * field("cart").length();
   * ```
   *
   * @returns A new `Expression` representing the length of the string, array, map, vector, or bytes.
   */
  length() {
    return new FunctionExpression("length", [this]);
  }
  /**
   * Creates an expression that computes the natural logarithm of a numeric value.
   *
   * @example
   * ```typescript
   * // Compute the natural logarithm of the 'value' field.
   * field("value").ln();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the natural logarithm of the numeric value.
   */
  ln() {
    return new FunctionExpression("ln", [this]);
  }
  /**
   * Creates an expression that computes the square root of a numeric value.
   *
   * @example
   * ```typescript
   * // Compute the square root of the 'value' field.
   * field("value").sqrt();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the square root of the numeric value.
   */
  sqrt() {
    return new FunctionExpression("sqrt", [this]);
  }
  /**
   * Creates an expression that reverses a string.
   *
   * @example
   * ```typescript
   * // Reverse the value of the 'myString' field.
   * field("myString").stringReverse();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the reversed string.
   */
  stringReverse() {
    return new FunctionExpression("string_reverse", [this]);
  }
  ifAbsent(e) {
    return new FunctionExpression("if_absent", [this, __PRIVATE_valueToDefaultExpr$1(e)], "ifAbsent");
  }
  ifNull(e) {
    return new FunctionExpression("if_null", [this, __PRIVATE_valueToDefaultExpr$1(e)], "ifNull");
  }
  /**
   * Creates an expression that returns the first non-null, non-absent argument, without evaluating
   * the rest of the arguments. When all arguments are null or absent, returns the last argument.
   *
   * @example
   * ```typescript
   * // Returns the value of the first non-null, non-absent field among 'preferredName', 'fullName',
   * // or the last argument if all previous fields are null.
   * field("preferredName").coalesce(field("fullName"), "Anonymous");
   * ```
   *
   * @param replacement - The value to use if this expression evaluates to null.
   * @param others - Optional additional values to check if previous values are null.
   * @returns A new `Expression` representing the coalesce operation.
   */
  coalesce(e, ...n) {
    return new FunctionExpression("coalesce", [this, __PRIVATE_valueToDefaultExpr$1(e), ...n.map(__PRIVATE_valueToDefaultExpr$1)], "coalesce");
  }
  join(e) {
    return new FunctionExpression("join", [this, __PRIVATE_valueToDefaultExpr$1(e)], "join");
  }
  /**
   * Creates an expression that computes the base-10 logarithm of a numeric value.
   *
   * @example
   * ```typescript
   * // Compute the base-10 logarithm of the 'value' field.
   * field("value").log10();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the base-10 logarithm of the numeric value.
   */
  log10() {
    return new FunctionExpression("log10", [this]);
  }
  /**
   * Creates an expression that computes the sum of the elements in an array.
   *
   * @example
   * ```typescript
   * // Compute the sum of the elements in the 'scores' field.
   * field("scores").arraySum();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the sum of the elements in the array.
   */
  arraySum() {
    return new FunctionExpression("sum", [this]);
  }
  split(e) {
    return new FunctionExpression("split", [this, __PRIVATE_valueToDefaultExpr$1(e)]);
  }
  timestampTruncate(e, n) {
    const t = [this, __PRIVATE_valueToDefaultExpr$1(e)];
    return n && t.push(__PRIVATE_valueToDefaultExpr$1(n)), new FunctionExpression("timestamp_trunc", t);
  }
  // TODO(search) enable with backend support
  // /**
  //  * Evaluates if the result of this `expression` is between
  //  * the `lowerBound` (inclusive) and `upperBound` (inclusive).
  //  *
  //  * @example
  //  * ```
  //  * // Evaluate if the 'tireWidth' is between 2.2 and 2.4
  //  * field('tireWidth').between(constant(2.2), constant(2.4))
  //  *
  //  * // This is functionally equivalent to
  //  * and(field('tireWidth').greaterThanOrEqual(contant(2.2)), field('tireWidth').lessThanOrEqual(constant(2.4)))
  //  * ```
  //  *
  //  * @param lowerBound - Lower bound (inclusive) of the range.
  //  * @param upperBound - Upper bound (inclusive) of the range.
  //  */
  // between(lowerBound: Expression, upperBound: Expression): BooleanExpression;
  // /**
  //  * Evaluates if the result of this `expression` is between
  //  * the `lowerBound` (inclusive) and `upperBound` (inclusive).
  //  *
  //  * @example
  //  * ```
  //  * // Evaluate if the 'tireWidth' is between 2.2 and 2.4
  //  * field('tireWidth').between(2.2, 2.4)
  //  *
  //  * // This is functionally equivalent to
  //  * and(field('tireWidth').greaterThanOrEqual(2.2), field('tireWidth').lessThanOrEqual(2.4))
  //  * ```
  //  *
  //  * @param lowerBound - Lower bound (inclusive) of the range.
  //  * @param upperBound - Upper bound (inclusive) of the range.
  //  */
  // between(lowerBound: unknown, upperBound: unknown): BooleanExpression;
  // between(lowerBound: unknown, upperBound: unknown): BooleanExpression {
  //   return new FunctionExpression('between', [
  //     this,
  //     valueToDefaultExpr(lowerBound),
  //     valueToDefaultExpr(upperBound)
  //   ]).asBoolean();
  // }
  // TODO(search) enable with backend support
  // /**
  //  * Evaluates to an HTML-formatted text snippet that renders terms matching
  //  * the search query in `<b>bold</b>`.
  //  *
  //  * @remarks This Expression can only be used within a `Search` stage.
  //  *
  //  * @param rquery Define the search query using the search domain-specific language (DSL).
  //  */
  // snippet(rquery: string): Expression;
  // /**
  //  * Evaluates to an HTML-formatted text snippet that renders terms matching
  //  * the search query in `<b>bold</b>`.
  //  *
  //  * @remarks This Expression can only be used within a `Search` stage.
  //  *
  //  * @param options Define how snippeting behaves.
  //  */
  // snippet(options: SnippetOptions): Expression;
  // snippet(queryOrOptions: string | SnippetOptions): Expression {
  //   const options: SnippetOptions = isString(queryOrOptions)
  //     ? { rquery: queryOrOptions }
  //     : queryOrOptions;
  //   const rquery = options.rquery;
  //   const internalOptions = {
  //     maxSnippetWidth: options.maxSnippetWidth,
  //     maxSnippets: options.maxSnippets,
  //     separator: options.separator
  //   };
  //   return new SnippetExpression([this, constant(rquery)], internalOptions);
  // }
  // TODO(new-expression): Add new expression method definitions above this line
  /**
   * Creates an {@link @firebase/firestore/pipelines#Ordering} that sorts documents in ascending order based on this expression.
   *
   * @example
   * ```typescript
   * // Sort documents by the 'name' field in ascending order
   * firestore.pipeline().collection("users")
   *   .sort(field("name").ascending());
   * ```
   *
   * @returns A new `Ordering` for ascending sorting.
   */
  ascending() {
    return ascending(this);
  }
  /**
   * Creates an {@link @firebase/firestore/pipelines#Ordering} that sorts documents in descending order based on this expression.
   *
   * @example
   * ```typescript
   * // Sort documents by the 'createdAt' field in descending order
   * firestore.pipeline().collection("users")
   *   .sort(field("createdAt").descending());
   * ```
   *
   * @returns A new `Ordering` for descending sorting.
   */
  descending() {
    return descending(this);
  }
  /**
   * Assigns an alias to this expression.
   *
   * Aliases are useful for renaming fields in the output of a stage or for giving meaningful
   * names to calculated values.
   *
   * @example
   * ```typescript
   * // Calculate the total price and assign it the alias "totalPrice" and add it to the output.
   * firestore.pipeline().collection("items")
   *   .addFields(field("price").multiply(field("quantity")).as("totalPrice"));
   * ```
   *
   * @param name - The alias to assign to this expression.
   * @returns A new {@link @firebase/firestore/pipelines#AliasedExpression} that wraps this
   *     expression and associates it with the provided alias.
   */
  as(e) {
    return new AliasedExpression(this, e, "as");
  }
};
var AggregateFunction = class _AggregateFunction {
  constructor(e, n) {
    this.name = e, this.params = n, this.exprType = "AggregateFunction", this._protoValueType = "ProtoValue";
  }
  /**
   * @internal
   * @private
   */
  static _create(e, n, t) {
    const r = new _AggregateFunction(e, n);
    return r._methodName = t, r;
  }
  /**
   * Assigns an alias to this AggregateFunction. The alias specifies the name that
   * the aggregated value will have in the output document.
   *
   * @example
   * ```typescript
   * // Calculate the average price of all items and assign it the alias "averagePrice".
   * firestore.pipeline().collection("items")
   *   .aggregate(field("price").average().as("averagePrice"));
   * ```
   *
   * @param name - The alias to assign to this AggregateFunction.
   * @returns A new {@link @firebase/firestore/pipelines#AliasedAggregate} that wraps this
   *     AggregateFunction and associates it with the provided alias.
   */
  as(e) {
    return new AliasedAggregate(this, e, "as");
  }
  /**
   * @private
   * @internal
   */
  _toProto(e) {
    return {
      functionValue: {
        name: this.name,
        args: this.params.map(((n) => n._toProto(e)))
      }
    };
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
    e = this._methodName ? e.i({
      methodName: this._methodName
    }) : e, this.params.forEach(((n) => n._readUserData(e)));
  }
};
var AliasedAggregate = class {
  constructor(e, n, t) {
    this.aggregate = e, this.alias = n, this._methodName = t;
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
    this.aggregate._readUserData(e);
  }
};
var AliasedExpression = class {
  constructor(e, n, t) {
    this.expr = e, this.alias = n, this._methodName = t, this.exprType = "AliasedExpression", this.selectable = true;
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
    this.expr._readUserData(e);
  }
};
var __PRIVATE_ListOfExprs = class extends Expression {
  constructor(e, n) {
    super(), this.u = e, this._methodName = n, this.expressionType = "ListOfExpressions";
  }
  /**
   * @private
   * @internal
   */
  _toProto(e) {
    return {
      arrayValue: {
        values: this.u.map(((n) => n._toProto(e)))
      }
    };
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
    this.u.forEach(((n) => n._readUserData(e)));
  }
};
var Field = class extends Expression {
  /**
   * @internal
   * @private
   * @hideconstructor
   * @param fieldPath
   */
  constructor(e, n) {
    super(), this.fieldPath = e, this._methodName = n, this.expressionType = "Field", this.selectable = true;
  }
  get fieldName() {
    return this.fieldPath.canonicalString();
  }
  get alias() {
    return this.fieldName;
  }
  get expr() {
    return this;
  }
  // TODO(search) enable with backend support
  // /**
  //  * Perform a full-text search on this field.
  //  *
  //  * @remarks This Expression can only be used within a `Search` stage.
  //  *
  //  * @param rquery Define the search query using the search domain-specific language (DSL).
  //  */
  // matches(rquery: string | Expression): BooleanExpression {
  //   return new FunctionExpression(
  //     'matches',
  //     [this, valueToDefaultExpr(rquery)],
  //     'matches'
  //   ).asBoolean();
  // }
  /**
   * @beta
   * Evaluates to the distance in meters between the location specified
   * by this field and the query location.
   *
   * @remarks This Expression can only be used within a `Search` stage.
   *
   * @param location - Compute distance to this GeoPoint.
   */
  geoDistance(e) {
    return new FunctionExpression("geo_distance", [this, __PRIVATE_valueToDefaultExpr$1(e)], "geoDistance");
  }
  /**
   * @private
   * @internal
   */
  _toProto(e) {
    return {
      fieldReferenceValue: this.fieldPath.canonicalString()
    };
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
  }
};
function field(e) {
  return _field(e, "field");
}
function _field(e, n) {
  return new Field("string" == typeof e ? F === e ? documentId()._internalPath : __PRIVATE_fieldPathFromArgument("field", e) : e._internalPath, n);
}
var Constant = class _Constant extends Expression {
  /**
   * @private
   * @internal
   * @hideconstructor
   * @param value - The value of the constant.
   */
  constructor(e, n) {
    super(), this.value = e, this._methodName = n, this.expressionType = "Constant";
  }
  /**
   * @private
   * @internal
   */
  static _fromProto(e) {
    const n = new _Constant(e, void 0);
    return n._protoValue = e, n;
  }
  /**
   * @private
   * @internal
   */
  _toProto(e) {
    return __PRIVATE_hardAssert(void 0 !== this._protoValue, 237), this._protoValue;
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
    e = this._methodName ? e.i({
      methodName: this._methodName
    }) : e, __PRIVATE_isFirestoreValue(this._protoValue) || (this._protoValue = __PRIVATE_parseData(this.value, e));
  }
};
function constant(e) {
  return __PRIVATE__constant(e, "constant");
}
function __PRIVATE__constant(e, n) {
  const t = new Constant(e, n);
  return "boolean" == typeof e ? new __PRIVATE_BooleanConstant(t) : t;
}
var MapValue = class extends Expression {
  constructor(e, n) {
    super(), this._ = e, this._methodName = n, this.expressionType = "Constant";
  }
  _readUserData(e) {
    e = this._methodName ? e.i({
      methodName: this._methodName
    }) : e, this._.forEach(((n) => {
      n._readUserData(e);
    }));
  }
  _toProto(e) {
    return __PRIVATE_toMapValue(e, this._);
  }
};
var FunctionExpression = class extends Expression {
  /**
   * @hideconstructor
   */
  constructor(e, n, t, r) {
    super(), this.name = e, this.params = n, this.expressionType = "Function", /**
     * @private
     * @internal
     */
    this._optionsProto = void 0, void 0 !== t && (this._methodName = t), void 0 !== r && (this._options = r);
  }
  /**
   * @private
   * @internal
   */
  get _optionsUtil() {
    return new OptionsUtil({});
  }
  /**
   * @private
   * @internal
   */
  _toProto(e) {
    const n = {
      functionValue: {
        name: this.name,
        args: this.params.map(((n2) => n2._toProto(e)))
      }
    };
    return this._optionsProto && (n.functionValue.options = this._optionsProto), n;
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
    e = this._methodName ? e.i({
      methodName: this._methodName
    }) : e, this.params.forEach(((n) => n._readUserData(e))), this._options && (this._optionsProto = this._optionsUtil.getOptionsProto(e, this._options));
  }
};
var BooleanExpression = class _BooleanExpression extends Expression {
  get _methodName() {
    return this._expr._methodName;
  }
  /**
   * Creates an aggregation that finds the count of input documents satisfying
   * this boolean expression.
   *
   * @example
   * ```typescript
   * // Find the count of documents with a score greater than 90
   * field("score").greaterThan(90).countIf().as("highestScore");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'countIf' aggregation.
   */
  countIf() {
    return AggregateFunction._create("count_if", [this], "countIf");
  }
  /**
   * Creates an expression that negates this boolean expression.
   *
   * @example
   * ```typescript
   * // Find documents where the 'tags' field does not contain 'completed'
   * field("tags").arrayContains("completed").not();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the negated filter condition.
   */
  not() {
    return new FunctionExpression("not", [this], "not").asBoolean();
  }
  /**
   * Creates a conditional expression that evaluates to the 'then' expression
   * if `this` expression evaluates to `true`,
   * or evaluates to the 'else' expression if `this` expressions evaluates `false`.
   *
   * @example
   * ```typescript
   * // If 'age' is greater than 18, return "Adult"; otherwise, return "Minor".
   * field("age").greaterThanOrEqual(18).conditional(constant("Adult"), constant("Minor"));
   * ```
   *
   * @param thenExpr - The expression to evaluate if the condition is true.
   * @param elseExpr - The expression to evaluate if the condition is false.
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the conditional expression.
   */
  conditional(e, n) {
    return new FunctionExpression("conditional", [this, e, n], "conditional");
  }
  ifError(e) {
    const n = __PRIVATE_valueToDefaultExpr$1(e), t = new FunctionExpression("if_error", [this, n], "ifError");
    return n instanceof _BooleanExpression ? t.asBoolean() : t;
  }
  /**
   * @private
   * @internal
   */
  _toProto(e) {
    return this._expr._toProto(e);
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
    this._expr._readUserData(e);
  }
};
var __PRIVATE_BooleanFunctionExpression = class extends BooleanExpression {
  constructor(e) {
    super(), this._expr = e, this.expressionType = "Function";
  }
};
var __PRIVATE_BooleanConstant = class extends BooleanExpression {
  constructor(e) {
    super(), this._expr = e, this.expressionType = "Constant";
  }
};
var __PRIVATE_BooleanField = class extends BooleanExpression {
  constructor(e) {
    super(), this._expr = e, this.expressionType = "Field";
  }
};
function countIf(e) {
  return e.countIf();
}
function arrayGet(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).arrayGet(__PRIVATE_valueToDefaultExpr$1(n));
}
function isError(e) {
  return e.isError().asBoolean();
}
function ifError(e, n) {
  return e instanceof BooleanExpression && n instanceof BooleanExpression ? e.ifError(n).asBoolean() : e.ifError(__PRIVATE_valueToDefaultExpr$1(n));
}
function isAbsent(e) {
  return __PRIVATE_fieldOrExpression$1(e).isAbsent();
}
function mapRemove(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).mapRemove(__PRIVATE_valueToDefaultExpr$1(n));
}
function mapMerge(e, n, ...t) {
  const r = __PRIVATE_valueToDefaultExpr$1(n), s = t.map(__PRIVATE_valueToDefaultExpr$1);
  return __PRIVATE_fieldOrExpression$1(e).mapMerge(r, ...s);
}
function documentId2(e) {
  return __PRIVATE_valueToDefaultExpr$1(e).documentId();
}
function parent(e) {
  return __PRIVATE_valueToDefaultExpr$1(e).parent();
}
function substring(e, n, t) {
  const r = __PRIVATE_fieldOrExpression$1(e), s = __PRIVATE_valueToDefaultExpr$1(n), i = void 0 === t ? void 0 : __PRIVATE_valueToDefaultExpr$1(t);
  return r.substring(s, i);
}
function add(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).add(__PRIVATE_valueToDefaultExpr$1(n));
}
function subtract(e, n) {
  const t = "string" == typeof e ? field(e) : e, r = __PRIVATE_valueToDefaultExpr$1(n);
  return t.subtract(r);
}
function multiply(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).multiply(__PRIVATE_valueToDefaultExpr$1(n));
}
function divide(e, n) {
  const t = "string" == typeof e ? field(e) : e, r = __PRIVATE_valueToDefaultExpr$1(n);
  return t.divide(r);
}
function mod(e, n) {
  const t = "string" == typeof e ? field(e) : e, r = __PRIVATE_valueToDefaultExpr$1(n);
  return t.mod(r);
}
function map(e) {
  return __PRIVATE__map(e);
}
function __PRIVATE__map(e, n) {
  const t = [];
  for (const n2 in e) if (Object.prototype.hasOwnProperty.call(e, n2)) {
    const r = e[n2];
    t.push(constant(n2)), t.push(__PRIVATE_valueToDefaultExpr$1(r));
  }
  return new FunctionExpression("map", t, "map");
}
function array(e) {
  return (function __PRIVATE__array(e2, n) {
    return new FunctionExpression("array", e2.map(((e3) => __PRIVATE_valueToDefaultExpr$1(e3))), n);
  })(e, "array");
}
function equal(e, n) {
  const t = e instanceof Expression ? e : field(e), r = __PRIVATE_valueToDefaultExpr$1(n);
  return t.equal(r);
}
function notEqual(e, n) {
  const t = e instanceof Expression ? e : field(e), r = __PRIVATE_valueToDefaultExpr$1(n);
  return t.notEqual(r);
}
function lessThan(e, n) {
  const t = e instanceof Expression ? e : field(e), r = __PRIVATE_valueToDefaultExpr$1(n);
  return t.lessThan(r);
}
function lessThanOrEqual(e, n) {
  const t = e instanceof Expression ? e : field(e), r = __PRIVATE_valueToDefaultExpr$1(n);
  return t.lessThanOrEqual(r);
}
function greaterThan(e, n) {
  const t = e instanceof Expression ? e : field(e), r = __PRIVATE_valueToDefaultExpr$1(n);
  return t.greaterThan(r);
}
function greaterThanOrEqual(e, n) {
  const t = e instanceof Expression ? e : field(e), r = __PRIVATE_valueToDefaultExpr$1(n);
  return t.greaterThanOrEqual(r);
}
function arrayConcat(e, n, ...t) {
  const r = t.map(((e2) => __PRIVATE_valueToDefaultExpr$1(e2)));
  return __PRIVATE_fieldOrExpression$1(e).arrayConcat(__PRIVATE_fieldOrExpression$1(n), ...r);
}
function arrayContains(e, n) {
  const t = __PRIVATE_fieldOrExpression$1(e), r = __PRIVATE_valueToDefaultExpr$1(n);
  return t.arrayContains(r);
}
function arrayContainsAny(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).arrayContainsAny(n);
}
function arrayContainsAll(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).arrayContainsAll(n);
}
function arrayLength(e) {
  return __PRIVATE_fieldOrExpression$1(e).arrayLength();
}
function equalAny(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).equalAny(n);
}
function notEqualAny(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).notEqualAny(n);
}
function xor(e, n, ...t) {
  return new FunctionExpression("xor", [e, n, ...t], "xor").asBoolean();
}
function conditional(e, n, t) {
  return new FunctionExpression("conditional", [e, n, t], "conditional");
}
function not(e) {
  return e.not();
}
function logicalMaximum(e, n, ...t) {
  return __PRIVATE_fieldOrExpression$1(e).logicalMaximum(__PRIVATE_valueToDefaultExpr$1(n), ...t.map(((e2) => __PRIVATE_valueToDefaultExpr$1(e2))));
}
function logicalMinimum(e, n, ...t) {
  return __PRIVATE_fieldOrExpression$1(e).logicalMinimum(__PRIVATE_valueToDefaultExpr$1(n), ...t.map(((e2) => __PRIVATE_valueToDefaultExpr$1(e2))));
}
function exists(e) {
  return __PRIVATE_fieldOrExpression$1(e).exists();
}
function reverse(e) {
  return __PRIVATE_fieldOrExpression$1(e).reverse();
}
function byteLength(e) {
  return __PRIVATE_fieldOrExpression$1(e).byteLength();
}
function exp(e) {
  return __PRIVATE_fieldOrExpression$1(e).exp();
}
function ceil(e) {
  return __PRIVATE_fieldOrExpression$1(e).ceil();
}
function floor(e) {
  return __PRIVATE_fieldOrExpression$1(e).floor();
}
function countDistinct(e) {
  return __PRIVATE_fieldOrExpression$1(e).countDistinct();
}
function charLength(e) {
  return __PRIVATE_fieldOrExpression$1(e).charLength();
}
function like(e, n) {
  const t = __PRIVATE_fieldOrExpression$1(e), r = __PRIVATE_valueToDefaultExpr$1(n);
  return t.like(r);
}
function regexContains(e, n) {
  const t = __PRIVATE_fieldOrExpression$1(e), r = __PRIVATE_valueToDefaultExpr$1(n);
  return t.regexContains(r);
}
function arrayFilter(e, n, t) {
  return __PRIVATE_fieldOrExpression$1(e).arrayFilter(n, t);
}
function arrayTransform(e, n, t) {
  return __PRIVATE_fieldOrExpression$1(e).arrayTransform(n, t);
}
function arrayTransformWithIndex(e, n, t, r) {
  return __PRIVATE_fieldOrExpression$1(e).arrayTransformWithIndex(n, t, r);
}
function arraySlice(e, n, t) {
  return __PRIVATE_fieldOrExpression$1(e).arraySlice(n, t);
}
function arrayFirst(e) {
  return __PRIVATE_fieldOrExpression$1(e).arrayFirst();
}
function arrayFirstN(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).arrayFirstN(__PRIVATE_valueToDefaultExpr$1(n));
}
function arrayLast(e) {
  return __PRIVATE_fieldOrExpression$1(e).arrayLast();
}
function arrayLastN(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).arrayLastN(__PRIVATE_valueToDefaultExpr$1(n));
}
function arrayMaximum(e) {
  return __PRIVATE_fieldOrExpression$1(e).arrayMaximum();
}
function arrayMaximumN(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).arrayMaximumN(__PRIVATE_valueToDefaultExpr$1(n));
}
function arrayMinimum(e) {
  return __PRIVATE_fieldOrExpression$1(e).arrayMinimum();
}
function arrayMinimumN(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).arrayMinimumN(__PRIVATE_valueToDefaultExpr$1(n));
}
function arrayIndexOf(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).arrayIndexOf(__PRIVATE_valueToDefaultExpr$1(n));
}
function arrayLastIndexOf(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).arrayLastIndexOf(__PRIVATE_valueToDefaultExpr$1(n));
}
function arrayIndexOfAll(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).arrayIndexOfAll(__PRIVATE_valueToDefaultExpr$1(n));
}
function regexFind(e, n) {
  const t = __PRIVATE_fieldOrExpression$1(e), r = __PRIVATE_valueToDefaultExpr$1(n);
  return t.regexFind(r);
}
function regexFindAll(e, n) {
  const t = __PRIVATE_fieldOrExpression$1(e), r = __PRIVATE_valueToDefaultExpr$1(n);
  return t.regexFindAll(r);
}
function regexMatch(e, n) {
  const t = __PRIVATE_fieldOrExpression$1(e), r = __PRIVATE_valueToDefaultExpr$1(n);
  return t.regexMatch(r);
}
function stringContains(e, n) {
  const t = __PRIVATE_fieldOrExpression$1(e), r = __PRIVATE_valueToDefaultExpr$1(n);
  return t.stringContains(r);
}
function startsWith(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).startsWith(__PRIVATE_valueToDefaultExpr$1(n));
}
function endsWith(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).endsWith(__PRIVATE_valueToDefaultExpr$1(n));
}
function toLower(e) {
  return __PRIVATE_fieldOrExpression$1(e).toLower();
}
function toUpper(e) {
  return __PRIVATE_fieldOrExpression$1(e).toUpper();
}
function trim(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).trim(n);
}
function ltrim(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).ltrim(n);
}
function rtrim(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).rtrim(n);
}
function type(e) {
  return __PRIVATE_fieldOrExpression$1(e).type();
}
function isType(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).isType(n);
}
function stringConcat(e, n, ...t) {
  return __PRIVATE_fieldOrExpression$1(e).stringConcat(__PRIVATE_valueToDefaultExpr$1(n), ...t.map(__PRIVATE_valueToDefaultExpr$1));
}
function stringIndexOf(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).stringIndexOf(n);
}
function stringRepeat(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).stringRepeat(n);
}
function stringReplaceAll(e, n, t) {
  return __PRIVATE_fieldOrExpression$1(e).stringReplaceAll(n, t);
}
function stringReplaceOne(e, n, t) {
  return __PRIVATE_fieldOrExpression$1(e).stringReplaceOne(n, t);
}
function mapGet(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).mapGet(n);
}
function mapSet(e, n, t, ...r) {
  return __PRIVATE_fieldOrExpression$1(e).mapSet(n, t, ...r);
}
function mapKeys(e) {
  return __PRIVATE_fieldOrExpression$1(e).mapKeys();
}
function mapValues(e) {
  return __PRIVATE_fieldOrExpression$1(e).mapValues();
}
function mapEntries(e) {
  return __PRIVATE_fieldOrExpression$1(e).mapEntries();
}
function countAll() {
  return AggregateFunction._create("count", [], "count");
}
function count(e) {
  return __PRIVATE_fieldOrExpression$1(e).count();
}
function sum(e) {
  return __PRIVATE_fieldOrExpression$1(e).sum();
}
function average(e) {
  return __PRIVATE_fieldOrExpression$1(e).average();
}
function minimum(e) {
  return __PRIVATE_fieldOrExpression$1(e).minimum();
}
function maximum(e) {
  return __PRIVATE_fieldOrExpression$1(e).maximum();
}
function first(e) {
  return __PRIVATE_fieldOrExpression$1(e).first();
}
function last(e) {
  return __PRIVATE_fieldOrExpression$1(e).last();
}
function arrayAgg(e) {
  return __PRIVATE_fieldOrExpression$1(e).arrayAgg();
}
function arrayAggDistinct(e) {
  return __PRIVATE_fieldOrExpression$1(e).arrayAggDistinct();
}
function cosineDistance(e, n) {
  const t = __PRIVATE_fieldOrExpression$1(e), r = __PRIVATE_vectorToExpr$1(n);
  return t.cosineDistance(r);
}
function dotProduct(e, n) {
  const t = __PRIVATE_fieldOrExpression$1(e), r = __PRIVATE_vectorToExpr$1(n);
  return t.dotProduct(r);
}
function euclideanDistance(e, n) {
  const t = __PRIVATE_fieldOrExpression$1(e), r = __PRIVATE_vectorToExpr$1(n);
  return t.euclideanDistance(r);
}
function vectorLength(e) {
  return __PRIVATE_fieldOrExpression$1(e).vectorLength();
}
function unixMicrosToTimestamp(e) {
  return __PRIVATE_fieldOrExpression$1(e).unixMicrosToTimestamp();
}
function timestampToUnixMicros(e) {
  return __PRIVATE_fieldOrExpression$1(e).timestampToUnixMicros();
}
function unixMillisToTimestamp(e) {
  return __PRIVATE_fieldOrExpression$1(e).unixMillisToTimestamp();
}
function timestampToUnixMillis(e) {
  return __PRIVATE_fieldOrExpression$1(e).timestampToUnixMillis();
}
function unixSecondsToTimestamp(e) {
  return __PRIVATE_fieldOrExpression$1(e).unixSecondsToTimestamp();
}
function timestampToUnixSeconds(e) {
  return __PRIVATE_fieldOrExpression$1(e).timestampToUnixSeconds();
}
function timestampAdd(e, n, t) {
  const r = __PRIVATE_fieldOrExpression$1(e), s = __PRIVATE_valueToDefaultExpr$1(n), i = __PRIVATE_valueToDefaultExpr$1(t);
  return r.timestampAdd(s, i);
}
function timestampSubtract(e, n, t) {
  const r = __PRIVATE_fieldOrExpression$1(e), s = __PRIVATE_valueToDefaultExpr$1(n), i = __PRIVATE_valueToDefaultExpr$1(t);
  return r.timestampSubtract(s, i);
}
function currentTimestamp() {
  return new FunctionExpression("current_timestamp", [], "currentTimestamp");
}
function and(e, n, ...t) {
  return new FunctionExpression("and", [e, n, ...t], "and").asBoolean();
}
function or(e, n, ...t) {
  return new FunctionExpression("or", [e, n, ...t], "xor").asBoolean();
}
function nor(e, n, ...t) {
  return new FunctionExpression("nor", [e, n, ...t], "nor").asBoolean();
}
function pow(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).pow(n);
}
function rand() {
  return new FunctionExpression("rand", [], "rand");
}
function round(e, n) {
  return void 0 === n ? __PRIVATE_fieldOrExpression$1(e).round() : __PRIVATE_fieldOrExpression$1(e).round(__PRIVATE_valueToDefaultExpr$1(n));
}
function trunc(e, n) {
  return void 0 === n ? __PRIVATE_fieldOrExpression$1(e).trunc() : __PRIVATE_fieldOrExpression$1(e).trunc(__PRIVATE_valueToDefaultExpr$1(n));
}
function collectionId(e) {
  return __PRIVATE_fieldOrExpression$1(e).collectionId();
}
function length(e) {
  return __PRIVATE_fieldOrExpression$1(e).length();
}
function ln(e) {
  return __PRIVATE_fieldOrExpression$1(e).ln();
}
function log(e, n) {
  return new FunctionExpression("log", [__PRIVATE_fieldOrExpression$1(e), __PRIVATE_valueToDefaultExpr$1(n)]);
}
function sqrt(e) {
  return __PRIVATE_fieldOrExpression$1(e).sqrt();
}
function stringReverse(e) {
  return __PRIVATE_fieldOrExpression$1(e).stringReverse();
}
function concat(e, n, ...t) {
  return new FunctionExpression("concat", [__PRIVATE_fieldOrExpression$1(e), __PRIVATE_valueToDefaultExpr$1(n), ...t.map(__PRIVATE_valueToDefaultExpr$1)]);
}
function abs(e) {
  return __PRIVATE_fieldOrExpression$1(e).abs();
}
function ifAbsent(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).ifAbsent(__PRIVATE_valueToDefaultExpr$1(n));
}
function ifNull(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).ifNull(n);
}
function coalesce(e, n, ...t) {
  return __PRIVATE_fieldOrExpression$1(e).coalesce(n, ...t);
}
function switchOn(e, n, ...t) {
  return new FunctionExpression("switch_on", [__PRIVATE_valueToDefaultExpr$1(e), __PRIVATE_valueToDefaultExpr$1(n), ...t.map(__PRIVATE_valueToDefaultExpr$1)], "switchOn");
}
function join(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).join(__PRIVATE_valueToDefaultExpr$1(n));
}
function log10(e) {
  return __PRIVATE_fieldOrExpression$1(e).log10();
}
function arraySum(e) {
  return __PRIVATE_fieldOrExpression$1(e).arraySum();
}
function split(e, n) {
  return __PRIVATE_fieldOrExpression$1(e).split(__PRIVATE_valueToDefaultExpr$1(n));
}
function timestampTruncate(e, n, t) {
  const r = __PRIVATE_isString(n) ? __PRIVATE_valueToDefaultExpr$1(n) : n;
  return __PRIVATE_fieldOrExpression$1(e).timestampTruncate(r, t);
}
function variable(e) {
  return new __PRIVATE_VariableExpression(e);
}
var __PRIVATE_VariableExpression = class extends Expression {
  /**
   * @hideconstructor
   */
  constructor(e) {
    super(), this.name = e, this.expressionType = "Variable";
  }
  /**
   * @internal
   */
  _toProto(e) {
    return {
      variableReferenceValue: this.name
    };
  }
  /**
   * @internal
   */
  _readUserData(e) {
  }
};
function currentDocument() {
  return new FunctionExpression("current_document", []);
}
var __PRIVATE_PipelineValueExpression = class extends Expression {
  /**
   * @hideconstructor
   */
  constructor(e) {
    super(), this.pipeline = e, this.expressionType = "PipelineValue";
  }
  /**
   * @internal
   */
  _toProto(e) {
    return __PRIVATE_toPipelineValue(this.pipeline._toProto(e));
  }
  /**
   * @internal
   */
  _readUserData(e) {
    this.pipeline._readUserData(e);
  }
};
function timestampDiff(e, n, t) {
  const r = __PRIVATE_fieldOrExpression$1(e), s = __PRIVATE_fieldOrExpression$1(n), i = __PRIVATE_valueToDefaultExpr$1(t);
  return r.timestampDiff(s, i);
}
function timestampExtract(e, n, t) {
  return __PRIVATE_fieldOrExpression$1(e).timestampExtract(__PRIVATE_valueToDefaultExpr$1(n), t);
}
function documentMatches(e) {
  return new FunctionExpression("document_matches", [__PRIVATE_valueToDefaultExpr$1(e)], "documentMatches").asBoolean();
}
function score() {
  return new FunctionExpression("score", [], "score");
}
function geoDistance(e, n) {
  return __PRIVATE_toField(e).geoDistance(n);
}
function ascending(e) {
  return new Ordering(__PRIVATE_fieldOrExpression$1(e), "ascending", "ascending");
}
function descending(e) {
  return new Ordering(__PRIVATE_fieldOrExpression$1(e), "descending", "descending");
}
var Ordering = class {
  constructor(e, n, t) {
    this.expr = e, this.direction = n, this._methodName = t, this._protoValueType = "ProtoValue";
  }
  /**
   * @private
   * @internal
   */
  _toProto(e) {
    return {
      mapValue: {
        fields: {
          direction: __PRIVATE_toStringValue(this.direction),
          expression: this.expr._toProto(e)
        }
      }
    };
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
    this.expr._readUserData(e);
  }
};
function __PRIVATE_isSelectable(e) {
  const n = e;
  return n.selectable && __PRIVATE_isString(n.alias) && __PRIVATE_isExpr(n.expr);
}
function __PRIVATE_isOrdering(e) {
  const n = e;
  return null != n && __PRIVATE_isExpr(n.expr) && ("ascending" === n.direction || "descending" === n.direction);
}
function __PRIVATE_isAliasedAggregate(e) {
  const n = e;
  return __PRIVATE_isString(n.alias) && n.aggregate instanceof AggregateFunction;
}
function __PRIVATE_isExpr(e) {
  return e instanceof Expression;
}
function __PRIVATE_isBooleanExpr(e) {
  return e instanceof BooleanExpression;
}
function __PRIVATE_isAliasedExpr(e) {
  return e instanceof AliasedExpression;
}
function __PRIVATE_isField(e) {
  return e instanceof Field;
}
function __PRIVATE_toField(e) {
  if (__PRIVATE_isString(e)) {
    return field(e);
  }
  return e;
}
function __PRIVATE_toPipelineBooleanExpr(e) {
  if (e instanceof FieldFilter) {
    const n = field(e.field.toString()), t = e.value;
    switch (e.op) {
      case "<":
        return and(n.exists(), n.lessThan(Constant._fromProto(t)));
      case "<=":
        return and(n.exists(), n.lessThanOrEqual(Constant._fromProto(t)));
      case ">":
        return and(n.exists(), n.greaterThan(Constant._fromProto(t)));
      case ">=":
        return and(n.exists(), n.greaterThanOrEqual(Constant._fromProto(t)));
      case "==":
        return and(n.exists(), n.equal(Constant._fromProto(t)));
      case "!=":
        return n.notEqual(Constant._fromProto(t));
      case "array-contains":
        return and(n.exists(), n.arrayContains(Constant._fromProto(t)));
      case "in": {
        const e2 = t?.arrayValue?.values?.map(((e3) => Constant._fromProto(e3)));
        return e2 ? 1 === e2.length ? and(n.exists(), n.equal(e2[0])) : and(n.exists(), n.equalAny(e2)) : and(n.exists(), n.equalAny([]));
      }
      case "array-contains-any": {
        const e2 = t?.arrayValue?.values?.map(((e3) => Constant._fromProto(e3)));
        return and(n.exists(), n.arrayContainsAny(e2));
      }
      case "not-in": {
        const e2 = t?.arrayValue?.values?.map(((e3) => Constant._fromProto(e3)));
        return e2 ? 1 === e2.length ? n.notEqual(e2[0]) : n.notEqualAny(e2) : n.notEqualAny([]);
      }
      default:
        fail(36935);
    }
  } else if (e instanceof CompositeFilter) switch (e.op) {
    case "and": {
      const n = e.getFilters().map(((e2) => __PRIVATE_toPipelineBooleanExpr(e2)));
      return and(n[0], n[1], ...n.slice(2));
    }
    case "or": {
      const n = e.getFilters().map(((e2) => __PRIVATE_toPipelineBooleanExpr(e2)));
      return or(n[0], n[1], ...n.slice(2));
    }
    default:
      fail(35306);
  }
  throw new Error(`Failed to convert filter to pipeline conditions: ${e}`);
}
function __PRIVATE_toPipeline(e, n) {
  let t;
  t = __PRIVATE_isCollectionGroupQuery(e) ? n.pipeline().collectionGroup(e.collectionGroup) : __PRIVATE_isDocumentQuery$1(e) ? n.pipeline().documents([doc(n, e.path.canonicalString())]) : n.pipeline().collection(e.path.canonicalString());
  for (const n2 of e.filters) t = t.where(__PRIVATE_toPipelineBooleanExpr(n2));
  const r = __PRIVATE_queryNormalizedOrderBy(e), s = e.explicitOrderBy.map(((e2) => field(e2.field.canonicalString()).exists()));
  if (s.length > 0) {
    const e2 = 1 === s.length ? s[0] : and(s[0], s[1], ...s.slice(2));
    t = t.where(e2);
  }
  const i = r.map(((e2) => "asc" === e2.dir ? field(e2.field.canonicalString()).ascending() : field(e2.field.canonicalString()).descending()));
  if (i.length > 0) if ("L" === e.limitType) {
    const n2 = (function __PRIVATE_reverseOrderings(e2) {
      return e2.map(((e3) => new Ordering(e3.expr, "ascending" === e3.direction ? "descending" : "ascending", void 0)));
    })(i);
    t = t.sort(n2[0], ...n2.slice(1)), // cursors
    null !== e.startAt && (t = t.where(__PRIVATE_whereConditionsFromCursor(e.startAt, i, "after"))), null !== e.endAt && (t = t.where(__PRIVATE_whereConditionsFromCursor(e.endAt, i, "before"))), t = t.limit(e.limit), t = t.sort(i[0], ...i.slice(1));
  } else t = t.sort(i[0], ...i.slice(1)), null !== e.startAt && (t = t.where(__PRIVATE_whereConditionsFromCursor(e.startAt, i, "after"))), null !== e.endAt && (t = t.where(__PRIVATE_whereConditionsFromCursor(e.endAt, i, "before"))), null !== e.limit && (t = t.limit(e.limit));
  return t;
}
function __PRIVATE_whereConditionsFromCursor(e, n, t) {
  const r = "before" === t ? lessThan : greaterThan, s = e.position.map(((e2) => Constant._fromProto(e2))), i = s.length;
  let o = n[i - 1].expr, a = s[i - 1], u = r(o, a);
  e.inclusive && // When the cursor bound is inclusive, then the last bound
  // can be equal to the value, otherwise it's not equal
  (u = or(u, o.equal(a)));
  for (let e2 = i - 2; e2 >= 0; e2--) o = n[e2].expr, a = s[e2], // For each field in the orderings, the condition is either
  // a) lt|gt the cursor value,
  // b) or equal the cursor value and lt|gt the cursor values for other fields
  u = or(r(o, a), and(o.equal(a), u));
  return u;
}
function __PRIVATE_selectablesToMap(e) {
  return new Map(Object.entries(__PRIVATE_selectablesToObject(e)));
}
function __PRIVATE_selectablesToObject(e) {
  const n = {};
  for (const t of e) {
    let e2, r;
    if ("string" == typeof t ? (e2 = t, r = field(t)) : t instanceof Field || t instanceof AliasedExpression ? (e2 = t.alias, r = t.expr) : fail(21273, {
      selectable: t
    }), void 0 !== n[e2]) throw new FirestoreError("invalid-argument", `Duplicate alias or field '${e2}'`);
    n[e2] = r;
  }
  return n;
}
function __PRIVATE_fieldOrExpression(e) {
  if (__PRIVATE_isString(e)) {
    return field(e);
  }
  return (function __PRIVATE_valueToDefaultExpr(e2) {
    let n;
    if (__PRIVATE_isFirestoreValue(e2)) return constant(e2);
    if (e2 instanceof Expression) return e2;
    n = __PRIVATE_isPlainObject(e2) ? map(e2) : e2 instanceof Array ? array(e2) : (
      /**
      * Checks if a value is a Pipeline object.
      *
      * We use duck typing here to avoid a circular dependency between pipeline.ts and pipeline_util.ts.
      */
      (function __PRIVATE_isPipeline$1(e3) {
        return "object" == typeof e3 && null !== e3 && "function" == typeof e3.toArrayExpression;
      })(e2) ? (function pipelineValue(e3) {
        return new __PRIVATE_PipelineValueExpression(e3);
      })(e2) : __PRIVATE__constant(e2, void 0)
    );
    return n;
  })(e);
}
var Stage = class {
  constructor(e) {
    var _a, _b;
    this.optionsProto = void 0, _b = _a = e, { rawOptions: this.rawOptions } = _b, this.knownOptions = __objRest(_b, ["rawOptions"]), _a;
  }
  _readUserData(e) {
    this.optionsProto = this._optionsUtil.getOptionsProto(e, this.knownOptions, this.rawOptions);
  }
  _toProto(e) {
    return {
      name: this._name,
      options: this.optionsProto
    };
  }
};
var __PRIVATE_AddFields = class extends Stage {
  get _name() {
    return "add_fields";
  }
  get _optionsUtil() {
    return new OptionsUtil({});
  }
  constructor(e, n) {
    super(n), this.fields = e;
  }
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: [__PRIVATE_toMapValue(e, this.fields)]
    });
  }
  _readUserData(e) {
    super._readUserData(e), __PRIVATE_readUserDataHelper(this.fields, e);
  }
};
var __PRIVATE_RemoveFields = class extends Stage {
  get _name() {
    return "remove_fields";
  }
  get _optionsUtil() {
    return new OptionsUtil({});
  }
  constructor(e, n) {
    super(n), this.fields = e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: this.fields.map(((n) => n._toProto(e)))
    });
  }
  _readUserData(e) {
    super._readUserData(e), __PRIVATE_readUserDataHelper(this.fields, e);
  }
};
var __PRIVATE_Define = class extends Stage {
  get _name() {
    return "let";
  }
  get _optionsUtil() {
    return new OptionsUtil({});
  }
  constructor(e, n) {
    super(n), this.l = e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: [__PRIVATE_toMapValue(e, this.l)]
    });
  }
  _readUserData(e) {
    super._readUserData(e), __PRIVATE_readUserDataHelper(this.l, e);
  }
};
var __PRIVATE_Aggregate = class extends Stage {
  get _name() {
    return "aggregate";
  }
  get _optionsUtil() {
    return new OptionsUtil({});
  }
  constructor(e, n, t) {
    super(t), this.groups = e, this.accumulators = n;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: [__PRIVATE_toMapValue(e, this.accumulators), __PRIVATE_toMapValue(e, this.groups)]
    });
  }
  _readUserData(e) {
    super._readUserData(e), __PRIVATE_readUserDataHelper(this.groups, e), __PRIVATE_readUserDataHelper(this.accumulators, e);
  }
};
var __PRIVATE_Distinct = class extends Stage {
  get _name() {
    return "distinct";
  }
  get _optionsUtil() {
    return new OptionsUtil({});
  }
  constructor(e, n) {
    super(n), this.groups = e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: [__PRIVATE_toMapValue(e, this.groups)]
    });
  }
  _readUserData(e) {
    super._readUserData(e), __PRIVATE_readUserDataHelper(this.groups, e);
  }
};
var __PRIVATE_CollectionSource = class extends Stage {
  get _name() {
    return "collection";
  }
  get _optionsUtil() {
    return new OptionsUtil({
      forceIndex: {
        serverName: "force_index"
      }
    });
  }
  constructor(e, n) {
    super(n), // prepend slash to collection string
    this.p = e.startsWith("/") ? e : "/" + e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: [{
        referenceValue: this.p
      }]
    });
  }
  _readUserData(e) {
    super._readUserData(e);
  }
};
var __PRIVATE_CollectionGroupSource = class extends Stage {
  get _name() {
    return "collection_group";
  }
  get _optionsUtil() {
    return new OptionsUtil({
      forceIndex: {
        serverName: "force_index"
      }
    });
  }
  constructor(e, n) {
    super(n), this.collectionId = e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: [{
        referenceValue: ""
      }, {
        stringValue: this.collectionId
      }]
    });
  }
  _readUserData(e) {
    super._readUserData(e);
  }
};
var __PRIVATE_SubcollectionSource = class extends Stage {
  get _name() {
    return "subcollection";
  }
  get _optionsUtil() {
    return new OptionsUtil({});
  }
  constructor(e, n) {
    super(n), this.path = e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: [{
        stringValue: this.path
      }]
    });
  }
  _readUserData(e) {
    super._readUserData(e);
  }
};
var __PRIVATE_DatabaseSource = class extends Stage {
  get _name() {
    return "database";
  }
  get _optionsUtil() {
    return new OptionsUtil({});
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return __spreadValues({}, super._toProto(e));
  }
  _readUserData(e) {
    super._readUserData(e);
  }
};
var __PRIVATE_DocumentsSource = class extends Stage {
  get _name() {
    return "documents";
  }
  get _optionsUtil() {
    return new OptionsUtil({});
  }
  constructor(e, n) {
    super(n), this.T = e.map(((e2) => e2.startsWith("/") ? e2 : "/" + e2));
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: this.T.map(((e2) => ({
        referenceValue: e2
      })))
    });
  }
  _readUserData(e) {
    super._readUserData(e);
  }
};
var __PRIVATE_Where = class extends Stage {
  get _name() {
    return "where";
  }
  get _optionsUtil() {
    return new OptionsUtil({});
  }
  constructor(e, n) {
    super(n), this.condition = e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: [this.condition._toProto(e)]
    });
  }
  _readUserData(e) {
    super._readUserData(e), __PRIVATE_readUserDataHelper(this.condition, e);
  }
};
var __PRIVATE_FindNearest = class extends Stage {
  get _name() {
    return "find_nearest";
  }
  get _optionsUtil() {
    return new OptionsUtil({
      limit: {
        serverName: "limit"
      },
      distanceField: {
        serverName: "distance_field"
      }
    });
  }
  constructor(e, n, t, r) {
    super(r), this.vectorValue = e, this.field = n, this.distanceMeasure = t;
  }
  /**
   * @private
   * @internal
   */
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: [this.field._toProto(e), this.vectorValue._toProto(e), __PRIVATE_toStringValue(this.distanceMeasure)]
    });
  }
  _readUserData(e) {
    super._readUserData(e), __PRIVATE_readUserDataHelper(this.vectorValue, e), __PRIVATE_readUserDataHelper(this.field, e);
  }
};
var __PRIVATE_Limit = class extends Stage {
  get _name() {
    return "limit";
  }
  get _optionsUtil() {
    return new OptionsUtil({});
  }
  constructor(e, n) {
    __PRIVATE_hardAssert(!isNaN(e) && e !== 1 / 0 && e !== -1 / 0, 34860), super(n), this.limit = e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: [toNumber(e, this.limit)]
    });
  }
};
var __PRIVATE_Offset = class extends Stage {
  get _name() {
    return "offset";
  }
  get _optionsUtil() {
    return new OptionsUtil({});
  }
  constructor(e, n) {
    super(n), this.offset = e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: [toNumber(e, this.offset)]
    });
  }
};
var __PRIVATE_Select = class extends Stage {
  get _name() {
    return "select";
  }
  get _optionsUtil() {
    return new OptionsUtil({});
  }
  constructor(e, n) {
    super(n), this.selections = e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: [__PRIVATE_toMapValue(e, this.selections)]
    });
  }
  _readUserData(e) {
    super._readUserData(e), __PRIVATE_readUserDataHelper(this.selections, e);
  }
};
var __PRIVATE_Sort = class extends Stage {
  get _name() {
    return "sort";
  }
  get _optionsUtil() {
    return new OptionsUtil({});
  }
  constructor(e, n) {
    super(n), this.orderings = e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: this.orderings.map(((n) => n._toProto(e)))
    });
  }
  _readUserData(e) {
    super._readUserData(e), __PRIVATE_readUserDataHelper(this.orderings, e);
  }
};
var __PRIVATE_Sample = class extends Stage {
  get _name() {
    return "sample";
  }
  get _optionsUtil() {
    return new OptionsUtil({});
  }
  constructor(e, n, t) {
    super(t), this.rate = e, this.mode = n;
  }
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: [toNumber(e, this.rate), __PRIVATE_toStringValue(this.mode)]
    });
  }
  _readUserData(e) {
    super._readUserData(e);
  }
};
var __PRIVATE_Union = class extends Stage {
  get _name() {
    return "union";
  }
  get _optionsUtil() {
    return new OptionsUtil({});
  }
  constructor(e, n) {
    super(n), this.other = e;
  }
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: [__PRIVATE_toPipelineValue(this.other._toProto(e))]
    });
  }
  _readUserData(e) {
    this.other._readUserData(e), super._readUserData(e);
  }
};
var __PRIVATE_Unnest = class extends Stage {
  get _name() {
    return "unnest";
  }
  get _optionsUtil() {
    return new OptionsUtil({
      indexField: {
        serverName: "index_field"
      }
    });
  }
  constructor(e, n, t) {
    super(t), this.alias = e, this.expr = n;
  }
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: [this.expr._toProto(e), field(this.alias)._toProto(e)]
    });
  }
  _readUserData(e) {
    super._readUserData(e), __PRIVATE_readUserDataHelper(this.expr, e);
  }
};
var __PRIVATE_Replace = class ___PRIVATE_Replace extends Stage {
  get _name() {
    return "replace_with";
  }
  get _optionsUtil() {
    return new OptionsUtil({});
  }
  constructor(e, n) {
    super(n), this.map = e;
  }
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: [this.map._toProto(e), __PRIVATE_toStringValue(___PRIVATE_Replace.A)]
    });
  }
  _readUserData(e) {
    super._readUserData(e), __PRIVATE_readUserDataHelper(this.map, e);
  }
};
__PRIVATE_Replace.A = "full_replace";
var __PRIVATE_Search = class extends Stage {
  constructor(e) {
    super(e), this.P = e;
  }
  get _name() {
    return "search";
  }
  get _optionsUtil() {
    return new OptionsUtil({
      query: {
        serverName: "query"
      },
      limit: {
        serverName: "limit"
      },
      h: {
        serverName: "retrieval_depth"
      },
      sort: {
        serverName: "sort"
      },
      addFields: {
        serverName: "add_fields"
      },
      select: {
        serverName: "select"
      },
      offset: {
        serverName: "offset"
      },
      V: {
        serverName: "query_enhancement"
      },
      languageCode: {
        serverName: "language_code"
      }
    });
  }
  /**
   * @private
   * @internal
   */
  _toProto(e) {
    return __spreadProps(__spreadValues({}, super._toProto(e)), {
      args: []
    });
  }
  _readUserData(e) {
    __PRIVATE_readUserDataHelper(this.P.query, e), this.P.addFields && __PRIVATE_readUserDataHelper(this.P.addFields, e), this.P.select && __PRIVATE_readUserDataHelper(this.P.select, e), this.P.sort && __PRIVATE_readUserDataHelper(this.P.sort, e), super._readUserData(e);
  }
};
var __PRIVATE_RawStage = class extends Stage {
  /**
   * @private
   * @internal
   */
  constructor(e, n, t) {
    super({
      rawOptions: t
    }), this.name = e, this.params = n;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return {
      name: this.name,
      args: this.params.map(((n) => n._toProto(e))),
      options: this.optionsProto
    };
  }
  _readUserData(e) {
    super._readUserData(e), __PRIVATE_readUserDataHelper(this.params, e);
  }
  get _name() {
    return this.name;
  }
  get _optionsUtil() {
    return new OptionsUtil({});
  }
};
function __PRIVATE_readUserDataHelper(e, n) {
  return __PRIVATE_isUserData(e) ? e._readUserData(n) : Array.isArray(e) ? e.forEach(((e2) => e2._readUserData(n))) : e instanceof Map ? e.forEach(((e2) => e2._readUserData(n))) : Object.values(e).forEach(((e2) => e2._readUserData(n))), e;
}
var Pipeline$1 = class _Pipeline$1 {
  /**
   * @internal
   * @private
   * @param _db
   * @param stages
   */
  constructor(e, n) {
    this._db = e, this.stages = n;
  }
  _readUserData(e) {
    this.stages.forEach(((n) => {
      const t = e.i({
        methodName: n._name
      });
      n._readUserData(t);
    }));
  }
  addFields(e, ...n) {
    var _a, _b;
    let t, r;
    __PRIVATE_isSelectable(e) ? (t = [e, ...n], r = {}) : (_b = _a = e, { fields: t } = _b, r = __objRest(_b, ["fields"]), _a);
    const s = __PRIVATE_selectablesToMap(t), i = new __PRIVATE_AddFields(s, r);
    return this._addStage(i);
  }
  removeFields(e, ...n) {
    const t = __PRIVATE_isField(e) || __PRIVATE_isString(e) ? {} : e, r = (__PRIVATE_isField(e) || __PRIVATE_isString(e) ? [e, ...n] : e.fields).map(((e2) => __PRIVATE_isString(e2) ? field(e2) : e2)), s = new __PRIVATE_RemoveFields(r, t);
    return this._addStage(s);
  }
  define(e, ...n) {
    const t = __PRIVATE_isAliasedExpr(e) ? {} : e, r = __PRIVATE_selectablesToMap(__PRIVATE_isAliasedExpr(e) ? [e, ...n] : e.variables), s = new __PRIVATE_Define(r, t);
    return this._addStage(s);
  }
  /**
   * @public
   * Converts this Pipeline into an expression that evaluates to an array of results.
   *
   * <p>Result Unwrapping:</p>
   * <ul>
   *  <li>If the items have a single field, their values are unwrapped and returned directly in the array.</li>
   *  <li>If the items have multiple fields, they are returned as objects in the array</li>
   * </ul>
   *
   * @example
   * ```typescript
   * // Get a list of reviewers for each book
   * db.pipeline().collection("books")
   *     .define(field("id").as("book_id"))
   *     .addFields(
   *         db.pipeline().collection("reviews")
   *             .where(field("book_id").equal(variable("book_id")))
   *             .select(field("reviewer"))
   *             .toArrayExpression()
   *             .as("reviewers")
   *     )
   * ```
   *
   * Output:
   * ```json
   * [
   *   {
   *     "id": "1",
   *     "title": "1984",
   *     "reviewers": ["Alice", "Bob"]
   *   }
   * ]
   * ```
   *
   * Multiple Fields:
   * ```typescript
   * // Get a list of reviews (reviewer and rating) for each book
   * db.pipeline().collection("books")
   *     .define(field("id").as("book_id"))
   *     .addFields(
   *         db.pipeline().collection("reviews")
   *             .where(field("book_id").equal(variable("book_id")))
   *             .select(field("reviewer"), field("rating"))
   *             .toArrayExpression()
   *             .as("reviews"))
   * ```
   *
   * Output:
   * ```json
   * [
   *   {
   *     "id": "1",
   *     "title": "1984",
   *     "reviews": [
   *       { "reviewer": "Alice", "rating": 5 },
   *       { "reviewer": "Bob", "rating": 4 }
   *     ]
   *   }
   * ]
   * ```
   *
   * @returns An `Expression` representing the execution of this pipeline.
   */
  toArrayExpression() {
    return new FunctionExpression("array", [__PRIVATE_fieldOrExpression(this)]);
  }
  /**
   * @public
   * Converts this Pipeline into an expression that evaluates to a single scalar result.
   *
   * <p><b>Runtime Validation:</b> The runtime validates that the result set contains zero or one item. If
   * zero items, it evaluates to `null`.</p>
   *
   * <p>Result Unwrapping:</p>
   * <ul>
   *  <li>If the item has a single field, its value is unwrapped and returned directly.</li>
   *  <li>f the item has multiple fields, they are returned as an object.</li>
   * </ul>
   *
   * @example
   * ```typescript
   * // Calculate average rating for a restaurant
   * db.pipeline().collection("restaurants").addFields(
   *   db.pipeline().collection("reviews")
   *     .where(field("restaurant_id").equal(variable("rid")))
   *     .aggregate(average("rating").as("avg"))
   *     // Unwraps the single "avg" field to a scalar double
   *     .toScalarExpression().as("average_rating")
   * )
   * ```
   *
   * Output:
   * ```json
   * {
   *   "name": "The Burger Joint",
   *   "average_rating": 4.5
   * }
   * ```
   *
   * Multiple Fields:
   * ```typescript
   * // Calculate average rating AND count for a restaurant
   * db.pipeline().collection("restaurants").addFields(
   *   db.pipeline().collection("reviews")
   *     .where(field("restaurant_id").equal(variable("rid")))
   *     .aggregate(
   *       average("rating").as("avg"),
   *       count().as("count")
   *     )
   *     // Returns an object with "avg" and "count" fields
   *     .toScalarExpression().as("stats")
   * )
   * ```
   *
   * Output:
   * ```json
   * {
   *   "name": "The Burger Joint",
   *   "stats": {
   *     "avg": 4.5,
   *     "count": 100
   *   }
   * }
   * ```
   *
   * @returns An `Expression` representing the execution of this pipeline.
   */
  toScalarExpression() {
    return new FunctionExpression("scalar", [__PRIVATE_fieldOrExpression(this)]);
  }
  select(e, ...n) {
    const t = __PRIVATE_isSelectable(e) || __PRIVATE_isString(e) ? {} : e, r = __PRIVATE_selectablesToMap(__PRIVATE_isSelectable(e) || __PRIVATE_isString(e) ? [e, ...n] : e.selections), s = new __PRIVATE_Select(r, t);
    return this._addStage(s);
  }
  where(e) {
    const n = __PRIVATE_isBooleanExpr(e) ? {} : e, t = __PRIVATE_isBooleanExpr(e) ? e : e.condition, r = new __PRIVATE_Where(t, n);
    return this._addStage(r);
  }
  offset(e) {
    let n, t;
    __PRIVATE_isNumber$1(e) ? (n = {}, t = e) : (n = e, t = e.offset);
    const r = new __PRIVATE_Offset(t, n);
    return this._addStage(r);
  }
  limit(e) {
    const n = __PRIVATE_isNumber$1(e) ? {} : e, t = __PRIVATE_isNumber$1(e) ? e : e.limit, r = new __PRIVATE_Limit(t, n);
    return this._addStage(r);
  }
  distinct(e, ...n) {
    const t = __PRIVATE_isString(e) || __PRIVATE_isSelectable(e) ? {} : e, r = __PRIVATE_selectablesToMap(__PRIVATE_isString(e) || __PRIVATE_isSelectable(e) ? [e, ...n] : e.groups), s = new __PRIVATE_Distinct(r, t);
    return this._addStage(s);
  }
  aggregate(e, ...n) {
    const t = __PRIVATE_isAliasedAggregate(e) ? {} : e, r = __PRIVATE_isAliasedAggregate(e) ? [e, ...n] : e.accumulators, s = __PRIVATE_isAliasedAggregate(e) ? [] : e.groups ?? [], i = (function __PRIVATE_aliasedAggregateToMap(e2) {
      return e2.reduce(((e3, n2) => {
        if (void 0 !== e3.get(n2.alias)) throw new FirestoreError("invalid-argument", `Duplicate alias or field '${n2.alias}'`);
        return e3.set(n2.alias, n2.aggregate), e3;
      }), /* @__PURE__ */ new Map());
    })(r), o = __PRIVATE_selectablesToMap(s), a = new __PRIVATE_Aggregate(o, i, t);
    return this._addStage(a);
  }
  /**
   * Performs a vector proximity search on the documents from the previous stage, returning the
   * K-nearest documents based on the specified query `vectorValue` and `distanceMeasure`. The
   * returned documents will be sorted in order from nearest to furthest from the query `vectorValue`.
   *
   * <p>Example:
   *
   * ```typescript
   * // Find the 10 most similar books based on the book description.
   * const bookDescription = "Lorem ipsum...";
   * const queryVector: number[] = ...; // compute embedding of `bookDescription`
   *
   * firestore.pipeline().collection("books")
   *     .findNearest({
   *       field: 'embedding',
   *       vectorValue: queryVector,
   *       distanceMeasure: 'euclidean',
   *       limit: 10,                        // optional
   *       distanceField: 'computedDistance' // optional
   *     });
   * ```
   *
   * @param options - An object that specifies required and optional parameters for the stage.
   * @returns A new {@link @firebase/firestore/pipelines#Pipeline} object with this stage appended to the stage list.
   */
  findNearest(e) {
    const n = __PRIVATE_toField(e.field), t = (function __PRIVATE_vectorToExpr(e2) {
      if (e2 instanceof Expression) return e2;
      if (e2 instanceof VectorValue) return constant(e2);
      if (Array.isArray(e2)) return constant(vector(e2));
      throw new Error("Unsupported value: " + typeof e2);
    })(e.vectorValue), r = {
      distanceField: e.distanceField ? __PRIVATE_toField(e.distanceField) : void 0,
      limit: e.limit,
      rawOptions: e.rawOptions
    }, s = new __PRIVATE_FindNearest(t, n, e.distanceMeasure, r);
    return this._addStage(s);
  }
  // TODO(search) link to external documentation citing list of supported
  // expressions, when that documentation is created. List is not maintained
  // in the SDK because the list will change as the backend enables support.
  /**
   * @beta
   * Add a search stage to the Pipeline. The search stage supports
   * full-text search and geo search expressions.
   *
   * @remarks This must be the first stage of the pipeline.
   * @remarks A limited set of expressions are supported in the search stage.
   *
   * @example
   * ```typescript
   * // Full-text search example
   * firestore.pipeline().collection("restaurants")
   * .search({
   *   query: documentMatches("waffles OR pancakes"),
   *   sort: [
   *     score().descending(),
   *   ],
   *   addFields: [
   *     score().as("searchScore"),
   *   ]
   * })
   * ```
   *
   * @example
   * ```typescript
   * // Geo distance search example
   * const queryLocation = new GeoPoint(0, 0);
   * db.pipeline().collection('restaurants').search({
   *   query: field('location').geoDistance(queryLocation).lessThanOrEqual(1000),
   *   sort: [
   *     score().descending(),
   *   ],
   * })
   * ```
   *
   * @param options - An object that specifies parameters for the stage.
   * @return A new `Pipeline` object with this stage appended to the stage list.
   */
  search(e) {
    const n = e.addFields ? __PRIVATE_selectablesToObject(e.addFields) : void 0, t = __PRIVATE_isExpr(e.query) ? e.query : documentMatches(e.query), r = __PRIVATE_isOrdering(e.sort) ? [e.sort] : e.sort, s = __spreadProps(__spreadValues({}, e), {
      addFields: n,
      select: void 0,
      query: t,
      sort: r
    }), i = new __PRIVATE_Search(s);
    return this._addStage(i);
  }
  sort(e, ...n) {
    const t = __PRIVATE_isOrdering(e) ? {} : e, r = __PRIVATE_isOrdering(e) ? [e, ...n] : e.orderings, s = new __PRIVATE_Sort(r, t);
    return this._addStage(s);
  }
  replaceWith(e) {
    const n = __PRIVATE_isString(e) || __PRIVATE_isExpr(e) ? {} : e, t = __PRIVATE_fieldOrExpression(__PRIVATE_isString(e) || __PRIVATE_isExpr(e) ? e : e.map), r = new __PRIVATE_Replace(t, n);
    return this._addStage(r);
  }
  sample(e) {
    const n = __PRIVATE_isNumber$1(e) ? {} : e;
    let t, r;
    __PRIVATE_isNumber$1(e) ? (t = e, r = "documents") : __PRIVATE_isNumber$1(e.documents) ? (t = e.documents, r = "documents") : (t = e.percentage, r = "percent");
    const s = new __PRIVATE_Sample(t, r, n);
    return this._addStage(s);
  }
  union(e) {
    var _a, _b;
    let n, t;
    !(function __PRIVATE_isPipeline(e2) {
      return e2 instanceof _Pipeline$1;
    })(e) ? (_b = _a = e, { other: t } = _b, n = __objRest(_b, ["other"]), _a) : (n = {}, t = e);
    const r = new __PRIVATE_Union(t, n);
    return this._addStage(r);
  }
  unnest(e, n) {
    var _a, _b;
    let t, r, s;
    __PRIVATE_isSelectable(e) ? (t = {}, r = e, s = n) : (_b = _a = e, { selectable: r, indexField: s } = _b, t = __objRest(_b, ["selectable", "indexField"]), _a);
    const i = r.alias, o = r.expr;
    __PRIVATE_isString(s) && (t.indexField = _field(s, "unnest"));
    const a = new __PRIVATE_Unnest(i, o, t);
    return this._addStage(a);
  }
  /**
   * Adds a raw stage to the pipeline.
   *
   * <p>This method provides a flexible way to extend the pipeline's functionality by adding custom
   * stages. Each raw stage is defined by a unique `name` and a set of `params` that control its
   * behavior.
   *
   * <p>Example (Assuming there is no 'where' stage available in SDK):
   *
   * @example
   * ```typescript
   * // Assume we don't have a built-in 'where' stage
   * firestore.pipeline().collection('books')
   *     .rawStage('where', [field('published').lessThan(1900)]) // Custom 'where' stage
   *     .select('title', 'author');
   * ```
   *
   * @param name - The unique name of the raw stage to add.
   * @param params - A list of parameters to configure the raw stage's behavior.
   * @param options - An object of key value pairs that specifies optional parameters for the stage.
   * @returns A new {@link @firebase/firestore/pipelines#Pipeline} object with this stage appended to the stage list.
   */
  rawStage(e, n, t) {
    const r = n.map(((e2) => e2 instanceof Expression || e2 instanceof AggregateFunction ? e2 : __PRIVATE_isPlainObject(e2) ? (function __PRIVATE__mapValue(e3) {
      const n2 = /* @__PURE__ */ new Map();
      for (const t2 in e3) if (Object.prototype.hasOwnProperty.call(e3, t2)) {
        const r2 = e3[t2];
        n2.set(t2, __PRIVATE_valueToDefaultExpr$1(r2));
      }
      return new MapValue(n2, void 0);
    })(e2) : __PRIVATE__constant(e2, "rawStage"))), s = new __PRIVATE_RawStage(e, r, t ?? {});
    return this._addStage(s);
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return {
      stages: this.stages.map(((n) => n._toProto(e)))
    };
  }
  _addStage(e) {
    const n = this.stages.map(((e2) => e2));
    return n.push(e), this.newPipeline(this._db, n);
  }
  /**
   * @internal
   * @private
   * @param db
   * @param userDataReader
   * @param userDataWriter
   * @param stages
   * @protected
   */
  newPipeline(e, n) {
    return new _Pipeline$1(e, n);
  }
};
var PipelineSource = class {
  /**
   * @internal
   * @private
   * @param databaseId
   * @param _createPipeline
   */
  constructor(e, n) {
    this.databaseId = e, this._createPipeline = n;
  }
  collection(e) {
    const n = __PRIVATE_isString(e) || __PRIVATE_isCollectionReference(e) ? {} : e, t = __PRIVATE_isString(e) || __PRIVATE_isCollectionReference(e) ? e : e.collection;
    __PRIVATE_isCollectionReference(t) && this._validateReference(t);
    const r = __PRIVATE_isString(t) ? t : t.path, s = new __PRIVATE_CollectionSource(r, n);
    return this._createPipeline([s]);
  }
  collectionGroup(e) {
    var _a, _b;
    let n, t;
    __PRIVATE_isString(e) ? (n = e, t = {}) : (_b = _a = e, { collectionId: n } = _b, t = __objRest(_b, ["collectionId"]), _a);
    const r = new __PRIVATE_CollectionGroupSource(n, t);
    return this._createPipeline([r]);
  }
  database(e) {
    const n = new __PRIVATE_DatabaseSource(
      // Process argument union(s) from method overloads
      e = e ?? {}
    );
    return this._createPipeline([n]);
  }
  documents(e) {
    var _a, _b;
    let n, t;
    Array.isArray(e) ? (t = e, n = {}) : (_b = _a = e, { docs: t } = _b, n = __objRest(_b, ["docs"]), _a), // Validate that all user provided references are for the same Firestore DB
    t.filter(((e2) => e2 instanceof DocumentReference)).forEach(((e2) => this._validateReference(e2)));
    const r = t.map(((e2) => __PRIVATE_isString(e2) ? e2 : e2.path)), s = new __PRIVATE_DocumentsSource(r, n);
    return this._createPipeline([s]);
  }
  /**
   * Convert the given Query into an equivalent Pipeline.
   *
   * @param query - A Query to be converted into a Pipeline.
   *
   * @throws `FirestoreError` Thrown if any of the provided DocumentReferences target a different project or database than the pipeline.
   */
  createFrom(e) {
    return __PRIVATE_toPipeline(e._query, e.firestore);
  }
  _validateReference(e) {
    const n = e.firestore._databaseId;
    if (!n.isEqual(this.databaseId)) throw new FirestoreError(D.INVALID_ARGUMENT, `Invalid ${e instanceof CollectionReference ? "CollectionReference" : "DocumentReference"}. The project ID ("${n.projectId}") or the database ("${n.database}") does not match the project ID ("${this.databaseId.projectId}") and database ("${this.databaseId.database}") of the target database of this Pipeline.`);
  }
};
function subcollection(e) {
  var _a, _b;
  let n, t;
  __PRIVATE_isString(e) ? (n = e, t = {}) : (_b = _a = e, { path: n } = _b, t = __objRest(_b, ["path"]), _a);
  const r = new __PRIVATE_SubcollectionSource(n, t);
  return new Pipeline$1(void 0, [r]);
}
var PipelineSnapshot = class {
  constructor(e, n, t) {
    this._pipeline = e, this._executionTime = t, this._results = n;
  }
  /**
   * An array of all the results in the `PipelineSnapshot`.
   */
  get results() {
    return this._results;
  }
  /**
   * The time at which the pipeline producing this result is executed.
   *
   * @readonly
   *
   */
  get executionTime() {
    if (void 0 === this._executionTime) throw new Error("'executionTime' is expected to exist, but it is undefined");
    return this._executionTime;
  }
};
var PipelineResult = class {
  /**
   * @private
   * @internal
   *
   * @param userDataWriter - The serializer used to encode/decode protobuf.
   * @param ref - The reference to the document.
   * @param fields - The fields of the Firestore `Document` Protobuf backing
   * this document.
   * @param createTime - The time when the document was created if the result is a document, undefined otherwise.
   * @param updateTime - The time when the document was last updated if the result is a document, undefined otherwise.
   */
  constructor(e, n, t, r, s) {
    this._ref = t, this._userDataWriter = e, this._createTime = r, this._updateTime = s, this._fields = n;
  }
  /**
   * The reference of the document, if it is a document; otherwise `undefined`.
   */
  get ref() {
    return this._ref;
  }
  /**
   * The ID of the document for which this PipelineResult contains data, if it is a document; otherwise `undefined`.
   *
   * @readonly
   *
   */
  get id() {
    return this._ref?.id;
  }
  /**
   * The time the document was created. Undefined if this result is not a document.
   *
   * @readonly
   */
  get createTime() {
    return this._createTime;
  }
  /**
   * The time the document was last updated (at the time the snapshot was
   * generated). Undefined if this result is not a document.
   *
   * @readonly
   */
  get updateTime() {
    return this._updateTime;
  }
  /**
   * Retrieves all fields in the result as an object.
   *
   * @returns An object containing all fields in the document or
   * 'undefined' if the document doesn't exist.
   *
   * @example
   * ```
   * let p = firestore.pipeline().collection('col');
   *
   * p.execute().then(results => {
   *   let data = results[0].data();
   *   console.log(`Retrieved data: ${JSON.stringify(data)}`);
   * });
   * ```
   */
  data() {
    return this._userDataWriter.convertValue(this._fields.value);
  }
  /**
   * @internal
   * @private
   *
   * Retrieves all fields in the result as a proto value.
   *
   * @returns An `Object` containing all fields in the result.
   */
  _fieldsProto() {
    return this._fields.clone().value.mapValue.fields;
  }
  /**
   * Retrieves the field specified by `field`.
   *
   * @param field - The field path
   * (e.g. 'foo' or 'foo.bar') to a specific field.
   * @returns The data at the specified field location or `undefined` if no
   * such field exists.
   *
   * @example
   * ```
   * let p = firestore.pipeline().collection('col');
   *
   * p.execute().then(results => {
   *   let field = results[0].get('a.b');
   *   console.log(`Retrieved field value: ${field}`);
   * });
   * ```
   */
  // We deliberately use `any` in the external API to not impose type-checking
  // on end users.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(e) {
    if (void 0 === this._fields) return;
    __PRIVATE_isField(e) && (e = e.fieldName);
    const n = this._fields.field(__PRIVATE_fieldPathFromArgument("DocumentSnapshot.get", e));
    return null !== n ? this._userDataWriter.convertValue(n) : void 0;
  }
};
function pipelineResultEqual(e, n) {
  return e === n || __PRIVATE_isOptionalEqual(e._ref, n._ref, refEqual) && __PRIVATE_isOptionalEqual(e._fields, n._fields, ((e2, n2) => e2.isEqual(n2)));
}
var Pipeline = class _Pipeline extends Pipeline$1 {
  /**
   * @internal
   * @private
   * @param db
   * @param userDataWriter
   * @param stages
   * @protected
   */
  newPipeline(e, n) {
    return new _Pipeline(e, n);
  }
};
function execute(e) {
  const n = e instanceof Pipeline$1 ? {
    pipeline: e
  } : e, _a = n, { pipeline: t, rawOptions: r } = _a, s = __objRest(_a, ["pipeline", "rawOptions"]);
  if (!t._db) return Promise.reject(new FirestoreError(D.FAILED_PRECONDITION, "This pipeline was created without a database (e.g., as a subcollection pipeline) and cannot be executed directly. It can only be used as part of another pipeline."));
  const i = __PRIVATE_cast(t._db, Firestore), o = ensureFirestoreConfigured(i), u = __PRIVATE_newUserDataReader(i).I(3, "execute");
  t._readUserData(u);
  const _ = new __PRIVATE_ExpUserDataWriter(i), l = new __PRIVATE_StructuredPipelineOptions(s, r);
  l._readUserData(u);
  const c = new StructuredPipeline(t, l);
  return __PRIVATE_firestoreClientExecutePipeline(o, c).then(((e2) => {
    const n2 = e2.length > 0 ? e2[0].executionTime?.toTimestamp() : void 0, r2 = e2.filter(((e3) => !!e3.fields)).map(((e3) => new PipelineResult(_, e3.fields, e3.key?.path ? new DocumentReference(i, null, e3.key) : void 0, e3.createTime?.toTimestamp(), e3.updateTime?.toTimestamp())));
    return new PipelineSnapshot(t, r2, n2);
  }));
}
Firestore.prototype.pipeline = function() {
  return new PipelineSource(this._databaseId, ((e) => new Pipeline(this, e)));
};
export {
  AggregateFunction,
  AliasedAggregate,
  AliasedExpression,
  BooleanExpression,
  Expression,
  Field,
  FunctionExpression,
  Ordering,
  Pipeline,
  PipelineResult,
  PipelineSnapshot,
  PipelineSource,
  _internalPipelineToExecutePipelineRequestProto,
  abs,
  add,
  and,
  array,
  arrayAgg,
  arrayAggDistinct,
  arrayConcat,
  arrayContains,
  arrayContainsAll,
  arrayContainsAny,
  arrayFilter,
  arrayFirst,
  arrayFirstN,
  arrayGet,
  arrayIndexOf,
  arrayIndexOfAll,
  arrayLast,
  arrayLastIndexOf,
  arrayLastN,
  arrayLength,
  arrayMaximum,
  arrayMaximumN,
  arrayMinimum,
  arrayMinimumN,
  arraySlice,
  arraySum,
  arrayTransform,
  arrayTransformWithIndex,
  ascending,
  average,
  byteLength,
  ceil,
  charLength,
  coalesce,
  collectionId,
  concat,
  conditional,
  constant,
  cosineDistance,
  count,
  countAll,
  countDistinct,
  countIf,
  currentDocument,
  currentTimestamp,
  descending,
  divide,
  documentId2 as documentId,
  documentMatches,
  dotProduct,
  endsWith,
  equal,
  equalAny,
  euclideanDistance,
  execute,
  exists,
  exp,
  field,
  first,
  floor,
  geoDistance,
  greaterThan,
  greaterThanOrEqual,
  ifAbsent,
  ifError,
  ifNull,
  isAbsent,
  isError,
  isType,
  join,
  last,
  length,
  lessThan,
  lessThanOrEqual,
  like,
  ln,
  log,
  log10,
  logicalMaximum,
  logicalMinimum,
  ltrim,
  map,
  mapEntries,
  mapGet,
  mapKeys,
  mapMerge,
  mapRemove,
  mapSet,
  mapValues,
  maximum,
  minimum,
  mod,
  multiply,
  nor,
  not,
  notEqual,
  notEqualAny,
  or,
  parent,
  pipelineResultEqual,
  pow,
  rand,
  regexContains,
  regexFind,
  regexFindAll,
  regexMatch,
  reverse,
  round,
  rtrim,
  score,
  split,
  sqrt,
  startsWith,
  stringConcat,
  stringContains,
  stringIndexOf,
  stringRepeat,
  stringReplaceAll,
  stringReplaceOne,
  stringReverse,
  subcollection,
  substring,
  subtract,
  sum,
  switchOn,
  timestampAdd,
  timestampDiff,
  timestampExtract,
  timestampSubtract,
  timestampToUnixMicros,
  timestampToUnixMillis,
  timestampToUnixSeconds,
  timestampTruncate,
  toLower,
  toUpper,
  trim,
  trunc,
  type,
  unixMicrosToTimestamp,
  unixMillisToTimestamp,
  unixSecondsToTimestamp,
  variable,
  vectorLength,
  xor
};
//# sourceMappingURL=firebase_firestore_pipelines.js.map
