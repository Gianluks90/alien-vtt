import {
  AbstractUserDataWriter,
  Bound,
  ByteString,
  Bytes,
  CollectionReference,
  CompositeFilter,
  D,
  DatabaseId,
  DocumentKey,
  DocumentReference,
  DocumentSet,
  FieldFilter,
  FieldIndex,
  FieldPath,
  FieldPath$1,
  FieldValue,
  Firestore,
  FirestoreError,
  GeoPoint,
  IndexSegment,
  IndexState,
  LoadBundleTask,
  ObjectValue,
  OnlineComponentProvider,
  OrderBy,
  Precondition,
  Query,
  ResourcePath,
  Timestamp,
  VectorValue,
  ViewSnapshot,
  __PRIVATE_AggregateImpl,
  __PRIVATE_AutoId,
  __PRIVATE_BundleLoader,
  __PRIVATE_DeleteMutation,
  __PRIVATE_EmptyAppCheckTokenProvider,
  __PRIVATE_EmptyAuthCredentialsProvider,
  __PRIVATE_ExpUserDataWriter,
  __PRIVATE_FirebaseAppCheckTokenProvider,
  __PRIVATE_FirebaseAuthCredentialsProvider,
  __PRIVATE_IndexedDbOfflineComponentProvider,
  __PRIVATE_LruGcMemoryOfflineComponentProvider,
  __PRIVATE_MemoryOfflineComponentProvider,
  __PRIVATE_MultiTabOfflineComponentProvider,
  __PRIVATE_cast,
  __PRIVATE_createBundleReaderSync,
  __PRIVATE_databaseIdFromApp,
  __PRIVATE_debugAssert,
  __PRIVATE_documentKeySet,
  __PRIVATE_fieldPathFromArgument,
  __PRIVATE_fieldPathFromDotSeparatedString,
  __PRIVATE_firestoreClientAddSnapshotsInSyncListener,
  __PRIVATE_firestoreClientDeleteAllFieldIndexes,
  __PRIVATE_firestoreClientGetDocumentFromLocalCache,
  __PRIVATE_firestoreClientGetDocumentViaSnapshotListener,
  __PRIVATE_firestoreClientGetDocumentsFromLocalCache,
  __PRIVATE_firestoreClientGetDocumentsViaSnapshotListener,
  __PRIVATE_firestoreClientListen,
  __PRIVATE_firestoreClientRunAggregateQuery,
  __PRIVATE_firestoreClientSetIndexConfiguration,
  __PRIVATE_firestoreClientSetPersistentCacheIndexAutoCreationEnabled,
  __PRIVATE_firestoreClientTransaction,
  __PRIVATE_firestoreClientWrite,
  __PRIVATE_fromBundledQuery,
  __PRIVATE_fromDocument,
  __PRIVATE_isBase64Available,
  __PRIVATE_isCollectionGroupQuery,
  __PRIVATE_isServerTimestamp,
  __PRIVATE_logDebug,
  __PRIVATE_logWarn,
  __PRIVATE_mapToArray,
  __PRIVATE_newQueryForPath,
  __PRIVATE_newSerializer,
  __PRIVATE_newUserDataReader,
  __PRIVATE_parseQueryValue,
  __PRIVATE_parseSetData,
  __PRIVATE_parseUpdateData,
  __PRIVATE_parseUpdateVarargs,
  __PRIVATE_queryNormalizedOrderBy,
  __PRIVATE_queryWithAddedFilter,
  __PRIVATE_queryWithAddedOrderBy,
  __PRIVATE_queryWithEndAt,
  __PRIVATE_queryWithLimit,
  __PRIVATE_queryWithStartAt,
  __PRIVATE_refValue,
  __PRIVATE_setSDKVersion,
  __PRIVATE_setTestingHooksSpi,
  __PRIVATE_validateIsNotUsedTogether,
  __PRIVATE_validateJSON,
  __PRIVATE_validatePositiveNumber,
  __PRIVATE_valueDescription,
  _internalAggregationQueryToProtoRunAggregationQueryRequest,
  _internalQueryToProtoQueryTarget,
  arrayRemove,
  arrayUnion,
  clearIndexedDbPersistence,
  collection,
  collectionGroup,
  connectFirestoreEmulator,
  deleteField,
  disableNetwork,
  doc,
  documentId,
  enableIndexedDbPersistence,
  enableMultiTabIndexedDbPersistence,
  enableNetwork,
  ensureFirestoreConfigured,
  fail,
  getFirestore,
  increment,
  initializeFirestore,
  loadBundle,
  namedQuery,
  property,
  queryEqual,
  refEqual,
  serverTimestamp,
  setLogLevel,
  sn,
  terminate,
  vector,
  waitForPendingWrites
} from "./chunk-IKP33CB4.js";
import {
  Component,
  SDK_VERSION,
  _registerComponent,
  deepEqual,
  getModularInstance,
  registerVersion
} from "./chunk-3NZYZMAX.js";
import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/@firebase/firestore/dist/index.esm.js
var Ut = "@firebase/firestore";
var Ht = "4.14.0";
function __PRIVATE_isPartialObserver(t) {
  return (function __PRIVATE_implementsAnyMethods(t2, e) {
    if ("object" != typeof t2 || null === t2) return false;
    const n = t2;
    for (const t3 of e) if (t3 in n && "function" == typeof n[t3]) return true;
    return false;
  })(t, ["next", "error", "complete"]);
}
var AggregateField = class {
  /**
   * Create a new AggregateField<T>
   * @param aggregateType - Specifies the type of aggregation operation to perform.
   * @param _internalFieldPath - Optionally specifies the field that is aggregated.
   * @internal
   */
  constructor(t = "count", e) {
    this._internalFieldPath = e, /** A type string to uniquely identify instances of this class. */
    this.type = "AggregateField", this.aggregateType = t;
  }
};
var AggregateQuerySnapshot = class {
  /** @hideconstructor */
  constructor(t, e, n) {
    this._userDataWriter = e, this._data = n, /** A type string to uniquely identify instances of this class. */
    this.type = "AggregateQuerySnapshot", this.query = t;
  }
  /**
   * Returns the results of the aggregations performed over the underlying
   * query.
   *
   * The keys of the returned object will be the same as those of the
   * `AggregateSpec` object specified to the aggregation method, and the values
   * will be the corresponding aggregation result.
   *
   * @returns The results of the aggregations performed over the underlying
   * query.
   */
  data() {
    return this._userDataWriter.convertObjectMap(this._data);
  }
  /**
   * @internal
   * @private
   *
   * Retrieves all fields in the snapshot as a proto value.
   *
   * @returns An `Object` containing all fields in the snapshot.
   */
  _fieldsProto() {
    return new ObjectValue({
      mapValue: {
        fields: this._data
      }
    }).clone().value.mapValue.fields;
  }
};
var DocumentSnapshot$1 = class {
  // Note: This class is stripped down version of the DocumentSnapshot in
  // the legacy SDK. The changes are:
  // - No support for SnapshotMetadata.
  // - No support for SnapshotOptions.
  /** @hideconstructor protected */
  constructor(t, e, n, r, s) {
    this._firestore = t, this._userDataWriter = e, this._key = n, this._document = r, this._converter = s;
  }
  /** Property of the `DocumentSnapshot` that provides the document's ID. */
  get id() {
    return this._key.path.lastSegment();
  }
  /**
   * The `DocumentReference` for the document included in the `DocumentSnapshot`.
   */
  get ref() {
    return new DocumentReference(this._firestore, this._converter, this._key);
  }
  /**
   * Signals whether or not the document at the snapshot's location exists.
   *
   * @returns true if the document exists.
   */
  exists() {
    return null !== this._document;
  }
  /**
   * Retrieves all fields in the document as an `Object`. Returns `undefined` if
   * the document doesn't exist.
   *
   * @returns An `Object` containing all fields in the document or `undefined`
   * if the document doesn't exist.
   */
  data() {
    if (this._document) {
      if (this._converter) {
        const t = new QueryDocumentSnapshot$1(
          this._firestore,
          this._userDataWriter,
          this._key,
          this._document,
          /* converter= */
          null
        );
        return this._converter.fromFirestore(t);
      }
      return this._userDataWriter.convertValue(this._document.data.value);
    }
  }
  /**
   * @internal
   * @private
   *
   * Retrieves all fields in the document as a proto Value. Returns `undefined` if
   * the document doesn't exist.
   *
   * @returns An `Object` containing all fields in the document or `undefined`
   * if the document doesn't exist.
   */
  _fieldsProto() {
    return this._document?.data.clone().value.mapValue.fields ?? void 0;
  }
  /**
   * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
   * document or field doesn't exist.
   *
   * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
   * field.
   * @returns The data at the specified field location or undefined if no such
   * field exists in the document.
   */
  // We are using `any` here to avoid an explicit cast by our users.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(t) {
    if (this._document) {
      const e = this._document.data.field(__PRIVATE_fieldPathFromArgument("DocumentSnapshot.get", t));
      if (null !== e) return this._userDataWriter.convertValue(e);
    }
  }
};
var QueryDocumentSnapshot$1 = class extends DocumentSnapshot$1 {
  /**
   * Retrieves all fields in the document as an `Object`.
   *
   * @override
   * @returns An `Object` containing all fields in the document.
   */
  data() {
    return super.data();
  }
};
function __PRIVATE_validateHasExplicitOrderByForLimitToLast(t) {
  if ("L" === t.limitType && 0 === t.explicitOrderBy.length) throw new FirestoreError(D.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
}
var AppliableConstraint = class {
};
var QueryConstraint = class extends AppliableConstraint {
};
function query(t, e, ...n) {
  let r = [];
  e instanceof AppliableConstraint && r.push(e), r = r.concat(n), (function __PRIVATE_validateQueryConstraintArray(t2) {
    const e2 = t2.filter(((t3) => t3 instanceof QueryCompositeFilterConstraint)).length, n2 = t2.filter(((t3) => t3 instanceof QueryFieldFilterConstraint)).length;
    if (e2 > 1 || e2 > 0 && n2 > 0) throw new FirestoreError(D.INVALID_ARGUMENT, "InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.");
  })(r);
  for (const e2 of r) t = e2._apply(t);
  return t;
}
var QueryFieldFilterConstraint = class _QueryFieldFilterConstraint extends QueryConstraint {
  /**
   * @internal
   */
  constructor(t, e, n) {
    super(), this._field = t, this._op = e, this._value = n, /** The type of this query constraint */
    this.type = "where";
  }
  static _create(t, e, n) {
    return new _QueryFieldFilterConstraint(t, e, n);
  }
  _apply(t) {
    const e = this._parse(t);
    return __PRIVATE_validateNewFieldFilter(t._query, e), new Query(t.firestore, t.converter, __PRIVATE_queryWithAddedFilter(t._query, e));
  }
  _parse(t) {
    const e = __PRIVATE_newUserDataReader(t.firestore), n = (function __PRIVATE_newQueryFilter(t2, e2, n2, r, s, a, o) {
      let i;
      if (s.isKeyField()) {
        if ("array-contains" === a || "array-contains-any" === a) throw new FirestoreError(D.INVALID_ARGUMENT, `Invalid Query. You can't perform '${a}' queries on documentId().`);
        if ("in" === a || "not-in" === a) {
          __PRIVATE_validateDisjunctiveFilterElements(o, a);
          const e3 = [];
          for (const n3 of o) e3.push(__PRIVATE_parseDocumentIdValue(r, t2, n3));
          i = {
            arrayValue: {
              values: e3
            }
          };
        } else i = __PRIVATE_parseDocumentIdValue(r, t2, o);
      } else "in" !== a && "not-in" !== a && "array-contains-any" !== a || __PRIVATE_validateDisjunctiveFilterElements(o, a), i = __PRIVATE_parseQueryValue(
        n2,
        e2,
        o,
        /* allowArrays= */
        "in" === a || "not-in" === a
      );
      const c = FieldFilter.create(s, a, i);
      return c;
    })(t._query, "where", e, t.firestore._databaseId, this._field, this._op, this._value);
    return n;
  }
};
function where(t, e, n) {
  const r = e, s = __PRIVATE_fieldPathFromArgument("where", t);
  return QueryFieldFilterConstraint._create(s, r, n);
}
var QueryCompositeFilterConstraint = class _QueryCompositeFilterConstraint extends AppliableConstraint {
  /**
   * @internal
   */
  constructor(t, e) {
    super(), this.type = t, this._queryConstraints = e;
  }
  static _create(t, e) {
    return new _QueryCompositeFilterConstraint(t, e);
  }
  _parse(t) {
    const e = this._queryConstraints.map(((e2) => e2._parse(t))).filter(((t2) => t2.getFilters().length > 0));
    return 1 === e.length ? e[0] : CompositeFilter.create(e, this._getOperator());
  }
  _apply(t) {
    const e = this._parse(t);
    return 0 === e.getFilters().length ? t : ((function __PRIVATE_validateNewFilter(t2, e2) {
      let n = t2;
      const r = e2.getFlattenedFilters();
      for (const t3 of r) __PRIVATE_validateNewFieldFilter(n, t3), n = __PRIVATE_queryWithAddedFilter(n, t3);
    })(t._query, e), new Query(t.firestore, t.converter, __PRIVATE_queryWithAddedFilter(t._query, e)));
  }
  _getQueryConstraints() {
    return this._queryConstraints;
  }
  _getOperator() {
    return "and" === this.type ? "and" : "or";
  }
};
function or(...t) {
  return t.forEach(((t2) => __PRIVATE_validateQueryFilterConstraint("or", t2))), QueryCompositeFilterConstraint._create("or", t);
}
function and(...t) {
  return t.forEach(((t2) => __PRIVATE_validateQueryFilterConstraint("and", t2))), QueryCompositeFilterConstraint._create("and", t);
}
var QueryOrderByConstraint = class _QueryOrderByConstraint extends QueryConstraint {
  /**
   * @internal
   */
  constructor(t, e) {
    super(), this._field = t, this._direction = e, /** The type of this query constraint */
    this.type = "orderBy";
  }
  static _create(t, e) {
    return new _QueryOrderByConstraint(t, e);
  }
  _apply(t) {
    const e = (function __PRIVATE_newQueryOrderBy(t2, e2, n) {
      if (null !== t2.startAt) throw new FirestoreError(D.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
      if (null !== t2.endAt) throw new FirestoreError(D.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
      const r = new OrderBy(e2, n);
      return r;
    })(t._query, this._field, this._direction);
    return new Query(t.firestore, t.converter, __PRIVATE_queryWithAddedOrderBy(t._query, e));
  }
};
function orderBy(t, e = "asc") {
  const n = e, r = __PRIVATE_fieldPathFromArgument("orderBy", t);
  return QueryOrderByConstraint._create(r, n);
}
var QueryLimitConstraint = class _QueryLimitConstraint extends QueryConstraint {
  /**
   * @internal
   */
  constructor(t, e, n) {
    super(), this.type = t, this._limit = e, this._limitType = n;
  }
  static _create(t, e, n) {
    return new _QueryLimitConstraint(t, e, n);
  }
  _apply(t) {
    return new Query(t.firestore, t.converter, __PRIVATE_queryWithLimit(t._query, this._limit, this._limitType));
  }
};
function limit(t) {
  return __PRIVATE_validatePositiveNumber("limit", t), QueryLimitConstraint._create(
    "limit",
    t,
    "F"
    /* LimitType.First */
  );
}
function limitToLast(t) {
  return __PRIVATE_validatePositiveNumber("limitToLast", t), QueryLimitConstraint._create(
    "limitToLast",
    t,
    "L"
    /* LimitType.Last */
  );
}
var QueryStartAtConstraint = class _QueryStartAtConstraint extends QueryConstraint {
  /**
   * @internal
   */
  constructor(t, e, n) {
    super(), this.type = t, this._docOrFields = e, this._inclusive = n;
  }
  static _create(t, e, n) {
    return new _QueryStartAtConstraint(t, e, n);
  }
  _apply(t) {
    const e = __PRIVATE_newQueryBoundFromDocOrFields(t, this.type, this._docOrFields, this._inclusive);
    return new Query(t.firestore, t.converter, __PRIVATE_queryWithStartAt(t._query, e));
  }
};
function startAt(...t) {
  return QueryStartAtConstraint._create(
    "startAt",
    t,
    /*inclusive=*/
    true
  );
}
function startAfter(...t) {
  return QueryStartAtConstraint._create(
    "startAfter",
    t,
    /*inclusive=*/
    false
  );
}
var QueryEndAtConstraint = class _QueryEndAtConstraint extends QueryConstraint {
  /**
   * @internal
   */
  constructor(t, e, n) {
    super(), this.type = t, this._docOrFields = e, this._inclusive = n;
  }
  static _create(t, e, n) {
    return new _QueryEndAtConstraint(t, e, n);
  }
  _apply(t) {
    const e = __PRIVATE_newQueryBoundFromDocOrFields(t, this.type, this._docOrFields, this._inclusive);
    return new Query(t.firestore, t.converter, __PRIVATE_queryWithEndAt(t._query, e));
  }
};
function endBefore(...t) {
  return QueryEndAtConstraint._create(
    "endBefore",
    t,
    /*inclusive=*/
    false
  );
}
function endAt(...t) {
  return QueryEndAtConstraint._create(
    "endAt",
    t,
    /*inclusive=*/
    true
  );
}
function __PRIVATE_newQueryBoundFromDocOrFields(t, e, n, r) {
  if (n[0] = getModularInstance(n[0]), n[0] instanceof DocumentSnapshot$1) return (function __PRIVATE_newQueryBoundFromDocument(t2, e2, n2, r2, s) {
    if (!r2) throw new FirestoreError(D.NOT_FOUND, `Can't use a DocumentSnapshot that doesn't exist for ${n2}().`);
    const a = [];
    for (const n3 of __PRIVATE_queryNormalizedOrderBy(t2)) if (n3.field.isKeyField()) a.push(__PRIVATE_refValue(e2, r2.key));
    else {
      const t3 = r2.data.field(n3.field);
      if (__PRIVATE_isServerTimestamp(t3)) throw new FirestoreError(D.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + n3.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
      if (null === t3) {
        const t4 = n3.field.canonicalString();
        throw new FirestoreError(D.INVALID_ARGUMENT, `Invalid query. You are trying to start or end a query using a document for which the field '${t4}' (used as the orderBy) does not exist.`);
      }
      a.push(t3);
    }
    return new Bound(a, s);
  })(t._query, t.firestore._databaseId, e, n[0]._document, r);
  {
    const s = __PRIVATE_newUserDataReader(t.firestore);
    return (function __PRIVATE_newQueryBoundFromFields(t2, e2, n2, r2, s2, a) {
      const o = t2.explicitOrderBy;
      if (s2.length > o.length) throw new FirestoreError(D.INVALID_ARGUMENT, `Too many arguments provided to ${r2}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);
      const i = [];
      for (let a2 = 0; a2 < s2.length; a2++) {
        const c = s2[a2];
        if (o[a2].field.isKeyField()) {
          if ("string" != typeof c) throw new FirestoreError(D.INVALID_ARGUMENT, `Invalid query. Expected a string for document ID in ${r2}(), but got a ${typeof c}`);
          if (!__PRIVATE_isCollectionGroupQuery(t2) && -1 !== c.indexOf("/")) throw new FirestoreError(D.INVALID_ARGUMENT, `Invalid query. When querying a collection and ordering by documentId(), the value passed to ${r2}() must be a plain document ID, but '${c}' contains a slash.`);
          const n3 = t2.path.child(ResourcePath.fromString(c));
          if (!DocumentKey.isDocumentKey(n3)) throw new FirestoreError(D.INVALID_ARGUMENT, `Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${r2}() must result in a valid document path, but '${n3}' is not because it contains an odd number of segments.`);
          const s3 = new DocumentKey(n3);
          i.push(__PRIVATE_refValue(e2, s3));
        } else {
          const t3 = __PRIVATE_parseQueryValue(n2, r2, c);
          i.push(t3);
        }
      }
      return new Bound(i, a);
    })(t._query, t.firestore._databaseId, s, e, n, r);
  }
}
function __PRIVATE_parseDocumentIdValue(t, e, n) {
  if ("string" == typeof (n = getModularInstance(n))) {
    if ("" === n) throw new FirestoreError(D.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
    if (!__PRIVATE_isCollectionGroupQuery(e) && -1 !== n.indexOf("/")) throw new FirestoreError(D.INVALID_ARGUMENT, `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);
    const r = e.path.child(ResourcePath.fromString(n));
    if (!DocumentKey.isDocumentKey(r)) throw new FirestoreError(D.INVALID_ARGUMENT, `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);
    return __PRIVATE_refValue(t, new DocumentKey(r));
  }
  if (n instanceof DocumentReference) return __PRIVATE_refValue(t, n._key);
  throw new FirestoreError(D.INVALID_ARGUMENT, `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${__PRIVATE_valueDescription(n)}.`);
}
function __PRIVATE_validateDisjunctiveFilterElements(t, e) {
  if (!Array.isArray(t) || 0 === t.length) throw new FirestoreError(D.INVALID_ARGUMENT, `Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);
}
function __PRIVATE_validateNewFieldFilter(t, e) {
  const n = (function __PRIVATE_findOpInsideFilters(t2, e2) {
    for (const n2 of t2) for (const t3 of n2.getFlattenedFilters()) if (e2.indexOf(t3.op) >= 0) return t3.op;
    return null;
  })(t.filters, (function __PRIVATE_conflictingOps(t2) {
    switch (t2) {
      case "!=":
        return [
          "!=",
          "not-in"
          /* Operator.NOT_IN */
        ];
      case "array-contains-any":
      case "in":
        return [
          "not-in"
          /* Operator.NOT_IN */
        ];
      case "not-in":
        return [
          "array-contains-any",
          "in",
          "not-in",
          "!="
          /* Operator.NOT_EQUAL */
        ];
      default:
        return [];
    }
  })(e.op));
  if (null !== n)
    throw n === e.op ? new FirestoreError(D.INVALID_ARGUMENT, `Invalid query. You cannot use more than one '${e.op.toString()}' filter.`) : new FirestoreError(D.INVALID_ARGUMENT, `Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`);
}
function __PRIVATE_validateQueryFilterConstraint(t, e) {
  if (!(e instanceof QueryFieldFilterConstraint || e instanceof QueryCompositeFilterConstraint)) throw new FirestoreError(D.INVALID_ARGUMENT, `Function ${t}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`);
}
function __PRIVATE_applyFirestoreDataConverter(t, e, n) {
  let r;
  return r = t ? n && (n.merge || n.mergeFields) ? t.toFirestore(e, n) : t.toFirestore(e) : e, r;
}
var __PRIVATE_LiteUserDataWriter = class extends AbstractUserDataWriter {
  constructor(t) {
    super(), this.firestore = t;
  }
  convertBytes(t) {
    return new Bytes(t);
  }
  convertReference(t) {
    const e = this.convertDocumentKey(t, this.firestore._databaseId);
    return new DocumentReference(
      this.firestore,
      /* converter= */
      null,
      e
    );
  }
};
function sum(t) {
  return new AggregateField("sum", __PRIVATE_fieldPathFromArgument("sum", t));
}
function average(t) {
  return new AggregateField("avg", __PRIVATE_fieldPathFromArgument("average", t));
}
function count() {
  return new AggregateField("count");
}
function aggregateFieldEqual(t, e) {
  return t instanceof AggregateField && e instanceof AggregateField && t.aggregateType === e.aggregateType && t._internalFieldPath?.canonicalString() === e._internalFieldPath?.canonicalString();
}
function aggregateQuerySnapshotEqual(t, e) {
  return queryEqual(t.query, e.query) && deepEqual(t.data(), e.data());
}
function getCountFromServer(t) {
  return getAggregateFromServer(t, {
    count: count()
  });
}
function getAggregateFromServer(t, e) {
  const n = __PRIVATE_cast(t.firestore, Firestore), r = ensureFirestoreConfigured(n), s = __PRIVATE_mapToArray(e, ((t2, e2) => new __PRIVATE_AggregateImpl(e2, t2.aggregateType, t2._internalFieldPath)));
  return __PRIVATE_firestoreClientRunAggregateQuery(r, t._query, s).then(((e2) => (
    /**
    * Converts the core aggregation result to an `AggregateQuerySnapshot`
    * that can be returned to the consumer.
    * @param query
    * @param aggregateResult - Core aggregation result
    * @internal
    */
    (function __PRIVATE_convertToAggregateQuerySnapshot(t2, e3, n2) {
      const r2 = new __PRIVATE_ExpUserDataWriter(t2), s2 = new AggregateQuerySnapshot(e3, r2, n2);
      return s2;
    })(n, t, e2)
  )));
}
var __PRIVATE_MemoryLocalCacheImpl = class {
  constructor(t) {
    this.kind = "memory", this._onlineComponentProvider = OnlineComponentProvider.provider, this._offlineComponentProvider = t?.garbageCollector ? t.garbageCollector._offlineComponentProvider : {
      build: () => new __PRIVATE_LruGcMemoryOfflineComponentProvider(void 0)
    };
  }
  toJSON() {
    return {
      kind: this.kind
    };
  }
};
var __PRIVATE_PersistentLocalCacheImpl = class {
  constructor(t) {
    let e;
    this.kind = "persistent", t?.tabManager ? (t.tabManager._initialize(t), e = t.tabManager) : (e = persistentSingleTabManager(void 0), e._initialize(t)), this._onlineComponentProvider = e._onlineComponentProvider, this._offlineComponentProvider = e._offlineComponentProvider;
  }
  toJSON() {
    return {
      kind: this.kind
    };
  }
};
var __PRIVATE_MemoryEagerGarbageCollectorImpl = class {
  constructor() {
    this.kind = "memoryEager", this._offlineComponentProvider = __PRIVATE_MemoryOfflineComponentProvider.provider;
  }
  toJSON() {
    return {
      kind: this.kind
    };
  }
};
var __PRIVATE_MemoryLruGarbageCollectorImpl = class {
  constructor(t) {
    this.kind = "memoryLru", this._offlineComponentProvider = {
      build: () => new __PRIVATE_LruGcMemoryOfflineComponentProvider(t)
    };
  }
  toJSON() {
    return {
      kind: this.kind
    };
  }
};
function memoryEagerGarbageCollector() {
  return new __PRIVATE_MemoryEagerGarbageCollectorImpl();
}
function memoryLruGarbageCollector(t) {
  return new __PRIVATE_MemoryLruGarbageCollectorImpl(t?.cacheSizeBytes);
}
function memoryLocalCache(t) {
  return new __PRIVATE_MemoryLocalCacheImpl(t);
}
function persistentLocalCache(t) {
  return new __PRIVATE_PersistentLocalCacheImpl(t);
}
var __PRIVATE_SingleTabManagerImpl = class {
  constructor(t) {
    this.forceOwnership = t, this.kind = "persistentSingleTab";
  }
  toJSON() {
    return {
      kind: this.kind
    };
  }
  /**
   * @internal
   */
  _initialize(t) {
    this._onlineComponentProvider = OnlineComponentProvider.provider, this._offlineComponentProvider = {
      build: (e) => new __PRIVATE_IndexedDbOfflineComponentProvider(e, t?.cacheSizeBytes, this.forceOwnership)
    };
  }
};
var __PRIVATE_MultiTabManagerImpl = class {
  constructor() {
    this.kind = "PersistentMultipleTab";
  }
  toJSON() {
    return {
      kind: this.kind
    };
  }
  /**
   * @internal
   */
  _initialize(t) {
    this._onlineComponentProvider = OnlineComponentProvider.provider, this._offlineComponentProvider = {
      build: (e) => new __PRIVATE_MultiTabOfflineComponentProvider(e, t?.cacheSizeBytes)
    };
  }
};
function persistentSingleTabManager(t) {
  return new __PRIVATE_SingleTabManagerImpl(t?.forceOwnership);
}
function persistentMultipleTabManager() {
  return new __PRIVATE_MultiTabManagerImpl();
}
var zt = "NOT SUPPORTED";
var SnapshotMetadata = class {
  /** @hideconstructor */
  constructor(t, e) {
    this.hasPendingWrites = t, this.fromCache = e;
  }
  /**
   * Returns true if this `SnapshotMetadata` is equal to the provided one.
   *
   * @param other - The `SnapshotMetadata` to compare against.
   * @returns true if this `SnapshotMetadata` is equal to the provided one.
   */
  isEqual(t) {
    return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache;
  }
};
var DocumentSnapshot = class _DocumentSnapshot extends DocumentSnapshot$1 {
  /** @hideconstructor protected */
  constructor(t, e, n, r, s, a) {
    super(t, e, n, r, a), this._firestore = t, this._firestoreImpl = t, this.metadata = s;
  }
  /**
   * Returns whether or not the data exists. True if the document exists.
   */
  exists() {
    return super.exists();
  }
  /**
   * Retrieves all fields in the document as an `Object`. Returns `undefined` if
   * the document doesn't exist.
   *
   * By default, `serverTimestamp()` values that have not yet been
   * set to their final value will be returned as `null`. You can override
   * this by passing an options object.
   *
   * @param options - An options object to configure how data is retrieved from
   * the snapshot (for example the desired behavior for server timestamps that
   * have not yet been set to their final value).
   * @returns An `Object` containing all fields in the document or `undefined` if
   * the document doesn't exist.
   */
  data(t = {}) {
    if (this._document) {
      if (this._converter) {
        const e = new QueryDocumentSnapshot(
          this._firestore,
          this._userDataWriter,
          this._key,
          this._document,
          this.metadata,
          /* converter= */
          null
        );
        return this._converter.fromFirestore(e, t);
      }
      return this._userDataWriter.convertValue(this._document.data.value, t.serverTimestamps);
    }
  }
  /**
   * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
   * document or field doesn't exist.
   *
   * By default, a `serverTimestamp()` that has not yet been set to
   * its final value will be returned as `null`. You can override this by
   * passing an options object.
   *
   * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
   * field.
   * @param options - An options object to configure how the field is retrieved
   * from the snapshot (for example the desired behavior for server timestamps
   * that have not yet been set to their final value).
   * @returns The data at the specified field location or undefined if no such
   * field exists in the document.
   */
  // We are using `any` here to avoid an explicit cast by our users.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(t, e = {}) {
    if (this._document) {
      const n = this._document.data.field(__PRIVATE_fieldPathFromArgument("DocumentSnapshot.get", t));
      if (null !== n) return this._userDataWriter.convertValue(n, e.serverTimestamps);
    }
  }
  /**
   * Returns a JSON-serializable representation of this `DocumentSnapshot` instance.
   *
   * @returns a JSON representation of this object.  Throws a {@link FirestoreError} if this
   * `DocumentSnapshot` has pending writes.
   */
  toJSON() {
    if (this.metadata.hasPendingWrites) throw new FirestoreError(D.FAILED_PRECONDITION, "DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");
    const t = this._document, e = {};
    if (e.type = _DocumentSnapshot._jsonSchemaVersion, e.bundle = "", e.bundleSource = "DocumentSnapshot", e.bundleName = this._key.toString(), !t || !t.isValidDocument() || !t.isFoundDocument()) return e;
    this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields, "previous");
    return e.bundle = (this._firestore, this.ref.path, "NOT SUPPORTED"), e;
  }
};
function documentSnapshotFromJSON(t, e, n) {
  if (__PRIVATE_validateJSON(e, DocumentSnapshot._jsonSchema)) {
    if (e.bundle === zt) throw new FirestoreError(D.INVALID_ARGUMENT, "The provided JSON object was created in a client environment, which is not supported.");
    const r = __PRIVATE_newSerializer(t._databaseId), s = __PRIVATE_createBundleReaderSync(e.bundle, r), a = s.Qu(), o = new __PRIVATE_BundleLoader(s.getMetadata(), r);
    for (const t2 of a) o.Ga(t2);
    const i = o.documents;
    if (1 !== i.length) throw new FirestoreError(D.INVALID_ARGUMENT, `Expected bundle data to contain 1 document, but it contains ${i.length} documents.`);
    const c = __PRIVATE_fromDocument(r, i[0].document), h = new DocumentKey(ResourcePath.fromString(e.bundleName));
    return new DocumentSnapshot(t, new __PRIVATE_LiteUserDataWriter(t), h, c, new SnapshotMetadata(
      /* hasPendingWrites= */
      false,
      /* fromCache= */
      false
    ), n || null);
  }
}
DocumentSnapshot._jsonSchemaVersion = "firestore/documentSnapshot/1.0", DocumentSnapshot._jsonSchema = {
  type: property("string", DocumentSnapshot._jsonSchemaVersion),
  bundleSource: property("string", "DocumentSnapshot"),
  bundleName: property("string"),
  bundle: property("string")
};
var QueryDocumentSnapshot = class extends DocumentSnapshot {
  /**
   * Retrieves all fields in the document as an `Object`.
   *
   * By default, `serverTimestamp()` values that have not yet been
   * set to their final value will be returned as `null`. You can override
   * this by passing an options object.
   *
   * @override
   * @param options - An options object to configure how data is retrieved from
   * the snapshot (for example the desired behavior for server timestamps that
   * have not yet been set to their final value).
   * @returns An `Object` containing all fields in the document.
   */
  data(t = {}) {
    return super.data(t);
  }
};
var QuerySnapshot = class _QuerySnapshot {
  /** @hideconstructor */
  constructor(t, e, n, r) {
    this._firestore = t, this._userDataWriter = e, this._snapshot = r, this.metadata = new SnapshotMetadata(r.hasPendingWrites, r.fromCache), this.query = n;
  }
  /** An array of all the documents in the `QuerySnapshot`. */
  get docs() {
    const t = [];
    return this.forEach(((e) => t.push(e))), t;
  }
  /** The number of documents in the `QuerySnapshot`. */
  get size() {
    return this._snapshot.docs.size;
  }
  /** True if there are no documents in the `QuerySnapshot`. */
  get empty() {
    return 0 === this.size;
  }
  /**
   * Enumerates all of the documents in the `QuerySnapshot`.
   *
   * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
   * each document in the snapshot.
   * @param thisArg - The `this` binding for the callback.
   */
  forEach(t, e) {
    this._snapshot.docs.forEach(((n) => {
      t.call(e, new QueryDocumentSnapshot(this._firestore, this._userDataWriter, n.key, n, new SnapshotMetadata(this._snapshot.mutatedKeys.has(n.key), this._snapshot.fromCache), this.query.converter));
    }));
  }
  /**
   * Returns an array of the documents changes since the last snapshot. If this
   * is the first snapshot, all documents will be in the list as 'added'
   * changes.
   *
   * @param options - `SnapshotListenOptions` that control whether metadata-only
   * changes (i.e. only `DocumentSnapshot.metadata` changed) should trigger
   * snapshot events.
   */
  docChanges(t = {}) {
    const e = !!t.includeMetadataChanges;
    if (e && this._snapshot.excludesMetadataChanges) throw new FirestoreError(D.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
    return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === e || (this._cachedChanges = /** Calculates the array of `DocumentChange`s for a given `ViewSnapshot`. */
    (function __PRIVATE_changesFromSnapshot(t2, e2) {
      if (t2._snapshot.oldDocs.isEmpty()) {
        let e3 = 0;
        return t2._snapshot.docChanges.map(((n) => {
          const r = new QueryDocumentSnapshot(t2._firestore, t2._userDataWriter, n.doc.key, n.doc, new SnapshotMetadata(t2._snapshot.mutatedKeys.has(n.doc.key), t2._snapshot.fromCache), t2.query.converter);
          return n.doc, {
            type: "added",
            doc: r,
            oldIndex: -1,
            newIndex: e3++
          };
        }));
      }
      {
        let n = t2._snapshot.oldDocs;
        return t2._snapshot.docChanges.filter(((t3) => e2 || 3 !== t3.type)).map(((e3) => {
          const r = new QueryDocumentSnapshot(t2._firestore, t2._userDataWriter, e3.doc.key, e3.doc, new SnapshotMetadata(t2._snapshot.mutatedKeys.has(e3.doc.key), t2._snapshot.fromCache), t2.query.converter);
          let s = -1, a = -1;
          return 0 !== e3.type && (s = n.indexOf(e3.doc.key), n = n.delete(e3.doc.key)), 1 !== e3.type && (n = n.add(e3.doc), a = n.indexOf(e3.doc.key)), {
            type: __PRIVATE_resultChangeType(e3.type),
            doc: r,
            oldIndex: s,
            newIndex: a
          };
        }));
      }
    })(this, e), this._cachedChangesIncludeMetadataChanges = e), this._cachedChanges;
  }
  /**
   * Returns a JSON-serializable representation of this `QuerySnapshot` instance.
   *
   * @returns a JSON representation of this object. Throws a {@link FirestoreError} if this
   * `QuerySnapshot` has pending writes.
   */
  toJSON() {
    if (this.metadata.hasPendingWrites) throw new FirestoreError(D.FAILED_PRECONDITION, "QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");
    const t = {};
    t.type = _QuerySnapshot._jsonSchemaVersion, t.bundleSource = "QuerySnapshot", t.bundleName = __PRIVATE_AutoId.newId(), this._firestore._databaseId.database, this._firestore._databaseId.projectId;
    const e = [], n = [], r = [];
    return this.docs.forEach(((t2) => {
      null !== t2._document && (e.push(t2._document), n.push(this._userDataWriter.convertObjectMap(t2._document.data.value.mapValue.fields, "previous")), r.push(t2.ref.path));
    })), t.bundle = (this._firestore, this.query._query, t.bundleName, "NOT SUPPORTED"), t;
  }
};
function querySnapshotFromJSON(t, e, n) {
  if (__PRIVATE_validateJSON(e, QuerySnapshot._jsonSchema)) {
    if (e.bundle === zt) throw new FirestoreError(D.INVALID_ARGUMENT, "The provided JSON object was created in a client environment, which is not supported.");
    const r = __PRIVATE_newSerializer(t._databaseId), s = __PRIVATE_createBundleReaderSync(e.bundle, r), a = s.Qu(), o = new __PRIVATE_BundleLoader(s.getMetadata(), r);
    for (const t2 of a) o.Ga(t2);
    if (1 !== o.queries.length) throw new FirestoreError(D.INVALID_ARGUMENT, `Snapshot data expected 1 query but found ${o.queries.length} queries.`);
    const i = __PRIVATE_fromBundledQuery(o.queries[0].bundledQuery), c = o.documents;
    let h = new DocumentSet();
    c.map(((t2) => {
      const e2 = __PRIVATE_fromDocument(r, t2.document);
      h = h.add(e2);
    }));
    const d = ViewSnapshot.fromInitialDocuments(
      i,
      h,
      __PRIVATE_documentKeySet(),
      /* fromCache= */
      false,
      /* hasCachedResults= */
      false
    ), p = new Query(t, n || null, i);
    return new QuerySnapshot(t, new __PRIVATE_LiteUserDataWriter(t), p, d);
  }
}
function __PRIVATE_resultChangeType(t) {
  switch (t) {
    case 0:
      return "added";
    case 2:
    case 3:
      return "modified";
    case 1:
      return "removed";
    default:
      return fail(61501, {
        type: t
      });
  }
}
function snapshotEqual(t, e) {
  return t instanceof DocumentSnapshot && e instanceof DocumentSnapshot ? t._firestore === e._firestore && t._key.isEqual(e._key) && (null === t._document ? null === e._document : t._document.isEqual(e._document)) && t._converter === e._converter : t instanceof QuerySnapshot && e instanceof QuerySnapshot && (t._firestore === e._firestore && queryEqual(t.query, e.query) && t.metadata.isEqual(e.metadata) && t._snapshot.isEqual(e._snapshot));
}
QuerySnapshot._jsonSchemaVersion = "firestore/querySnapshot/1.0", QuerySnapshot._jsonSchema = {
  type: property("string", QuerySnapshot._jsonSchemaVersion),
  bundleSource: property("string", "QuerySnapshot"),
  bundleName: property("string"),
  bundle: property("string")
};
var Yt = {
  maxAttempts: 5
};
var WriteBatch = class {
  /** @hideconstructor */
  constructor(t, e) {
    this._firestore = t, this._commitHandler = e, this._mutations = [], this._committed = false, this._dataReader = __PRIVATE_newUserDataReader(t);
  }
  set(t, e, n) {
    this._verifyNotCommitted();
    const r = __PRIVATE_validateReference(t, this._firestore), s = __PRIVATE_applyFirestoreDataConverter(r.converter, e, n), a = __PRIVATE_parseSetData(this._dataReader, "WriteBatch.set", r._key, s, null !== r.converter, n);
    return this._mutations.push(a.toMutation(r._key, Precondition.none())), this;
  }
  update(t, e, n, ...r) {
    this._verifyNotCommitted();
    const s = __PRIVATE_validateReference(t, this._firestore);
    let a;
    return a = "string" == typeof (e = getModularInstance(e)) || e instanceof FieldPath ? __PRIVATE_parseUpdateVarargs(this._dataReader, "WriteBatch.update", s._key, e, n, r) : __PRIVATE_parseUpdateData(this._dataReader, "WriteBatch.update", s._key, e), this._mutations.push(a.toMutation(s._key, Precondition.exists(true))), this;
  }
  /**
   * Deletes the document referred to by the provided {@link DocumentReference}.
   *
   * @param documentRef - A reference to the document to be deleted.
   * @returns This `WriteBatch` instance. Used for chaining method calls.
   */
  delete(t) {
    this._verifyNotCommitted();
    const e = __PRIVATE_validateReference(t, this._firestore);
    return this._mutations = this._mutations.concat(new __PRIVATE_DeleteMutation(e._key, Precondition.none())), this;
  }
  /**
   * Commits all of the writes in this write batch as a single atomic unit.
   *
   * The result of these writes will only be reflected in document reads that
   * occur after the returned promise resolves. If the client is offline, the
   * write fails. If you would like to see local modifications or buffer writes
   * until the client is online, use the full Firestore SDK.
   *
   * @returns A `Promise` resolved once all of the writes in the batch have been
   * successfully written to the backend as an atomic unit (note that it won't
   * resolve while you're offline).
   */
  commit() {
    return this._verifyNotCommitted(), this._committed = true, this._mutations.length > 0 ? this._commitHandler(this._mutations) : Promise.resolve();
  }
  _verifyNotCommitted() {
    if (this._committed) throw new FirestoreError(D.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.");
  }
};
function __PRIVATE_validateReference(t, e) {
  if ((t = getModularInstance(t)).firestore !== e) throw new FirestoreError(D.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
  return t;
}
var Transaction$1 = class {
  /** @hideconstructor */
  constructor(t, e) {
    this._firestore = t, this._transaction = e, this._dataReader = __PRIVATE_newUserDataReader(t);
  }
  /**
   * Reads the document referenced by the provided {@link DocumentReference}.
   *
   * @param documentRef - A reference to the document to be read.
   * @returns A `DocumentSnapshot` with the read data.
   */
  get(t) {
    const e = __PRIVATE_validateReference(t, this._firestore), n = new __PRIVATE_LiteUserDataWriter(this._firestore);
    return this._transaction.lookup([e._key]).then(((t2) => {
      if (!t2 || 1 !== t2.length) return fail(24041);
      const r = t2[0];
      if (r.isFoundDocument()) return new DocumentSnapshot$1(this._firestore, n, r.key, r, e.converter);
      if (r.isNoDocument()) return new DocumentSnapshot$1(this._firestore, n, e._key, null, e.converter);
      throw fail(18433, {
        doc: r
      });
    }));
  }
  set(t, e, n) {
    const r = __PRIVATE_validateReference(t, this._firestore), s = __PRIVATE_applyFirestoreDataConverter(r.converter, e, n), a = __PRIVATE_parseSetData(this._dataReader, "Transaction.set", r._key, s, null !== r.converter, n);
    return this._transaction.set(r._key, a), this;
  }
  update(t, e, n, ...r) {
    const s = __PRIVATE_validateReference(t, this._firestore);
    let a;
    return a = "string" == typeof (e = getModularInstance(e)) || e instanceof FieldPath ? __PRIVATE_parseUpdateVarargs(this._dataReader, "Transaction.update", s._key, e, n, r) : __PRIVATE_parseUpdateData(this._dataReader, "Transaction.update", s._key, e), this._transaction.update(s._key, a), this;
  }
  /**
   * Deletes the document referred to by the provided {@link DocumentReference}.
   *
   * @param documentRef - A reference to the document to be deleted.
   * @returns This `Transaction` instance. Used for chaining method calls.
   */
  delete(t) {
    const e = __PRIVATE_validateReference(t, this._firestore);
    return this._transaction.delete(e._key), this;
  }
};
var Transaction = class extends Transaction$1 {
  // This class implements the same logic as the Transaction API in the Lite SDK
  // but is subclassed in order to return its own DocumentSnapshot types.
  /** @hideconstructor */
  constructor(t, e) {
    super(t, e), this._firestore = t;
  }
  /**
   * Reads the document referenced by the provided {@link DocumentReference}.
   *
   * @param documentRef - A reference to the document to be read.
   * @returns A `DocumentSnapshot` with the read data.
   */
  get(t) {
    const e = __PRIVATE_validateReference(t, this._firestore), n = new __PRIVATE_ExpUserDataWriter(this._firestore);
    return super.get(t).then(((t2) => new DocumentSnapshot(this._firestore, n, e._key, t2._document, new SnapshotMetadata(
      /* hasPendingWrites= */
      false,
      /* fromCache= */
      false
    ), e.converter)));
  }
};
function runTransaction(t, e, n) {
  t = __PRIVATE_cast(t, Firestore);
  const r = __spreadValues(__spreadValues({}, Yt), n);
  !(function __PRIVATE_validateTransactionOptions(t2) {
    if (t2.maxAttempts < 1) throw new FirestoreError(D.INVALID_ARGUMENT, "Max attempts must be at least 1");
  })(r);
  const s = ensureFirestoreConfigured(t);
  return __PRIVATE_firestoreClientTransaction(s, ((n2) => e(new Transaction(t, n2))), r);
}
function getDoc(t) {
  t = __PRIVATE_cast(t, DocumentReference);
  const e = __PRIVATE_cast(t.firestore, Firestore), n = ensureFirestoreConfigured(e);
  return __PRIVATE_firestoreClientGetDocumentViaSnapshotListener(n, t._key).then(((n2) => __PRIVATE_convertToDocSnapshot(e, t, n2)));
}
function getDocFromCache(t) {
  t = __PRIVATE_cast(t, DocumentReference);
  const e = __PRIVATE_cast(t.firestore, Firestore), n = ensureFirestoreConfigured(e), r = new __PRIVATE_ExpUserDataWriter(e);
  return __PRIVATE_firestoreClientGetDocumentFromLocalCache(n, t._key).then(((n2) => new DocumentSnapshot(e, r, t._key, n2, new SnapshotMetadata(
    null !== n2 && n2.hasLocalMutations,
    /* fromCache= */
    true
  ), t.converter)));
}
function getDocFromServer(t) {
  t = __PRIVATE_cast(t, DocumentReference);
  const e = __PRIVATE_cast(t.firestore, Firestore), n = ensureFirestoreConfigured(e);
  return __PRIVATE_firestoreClientGetDocumentViaSnapshotListener(n, t._key, {
    source: "server"
  }).then(((n2) => __PRIVATE_convertToDocSnapshot(e, t, n2)));
}
function getDocs(t) {
  t = __PRIVATE_cast(t, Query);
  const e = __PRIVATE_cast(t.firestore, Firestore), n = ensureFirestoreConfigured(e), r = new __PRIVATE_ExpUserDataWriter(e);
  return __PRIVATE_validateHasExplicitOrderByForLimitToLast(t._query), __PRIVATE_firestoreClientGetDocumentsViaSnapshotListener(n, t._query).then(((n2) => new QuerySnapshot(e, r, t, n2)));
}
function getDocsFromCache(t) {
  t = __PRIVATE_cast(t, Query);
  const e = __PRIVATE_cast(t.firestore, Firestore), n = ensureFirestoreConfigured(e), r = new __PRIVATE_ExpUserDataWriter(e);
  return __PRIVATE_firestoreClientGetDocumentsFromLocalCache(n, t._query).then(((n2) => new QuerySnapshot(e, r, t, n2)));
}
function getDocsFromServer(t) {
  t = __PRIVATE_cast(t, Query);
  const e = __PRIVATE_cast(t.firestore, Firestore), n = ensureFirestoreConfigured(e), r = new __PRIVATE_ExpUserDataWriter(e);
  return __PRIVATE_firestoreClientGetDocumentsViaSnapshotListener(n, t._query, {
    source: "server"
  }).then(((n2) => new QuerySnapshot(e, r, t, n2)));
}
function setDoc(t, e, n) {
  t = __PRIVATE_cast(t, DocumentReference);
  const r = __PRIVATE_cast(t.firestore, Firestore), s = __PRIVATE_applyFirestoreDataConverter(t.converter, e, n), o = __PRIVATE_newUserDataReader(r);
  return executeWrite(r, [__PRIVATE_parseSetData(o, "setDoc", t._key, s, null !== t.converter, n).toMutation(t._key, Precondition.none())]);
}
function updateDoc(t, e, n, ...r) {
  t = __PRIVATE_cast(t, DocumentReference);
  const s = __PRIVATE_cast(t.firestore, Firestore), o = __PRIVATE_newUserDataReader(s);
  let i;
  i = "string" == typeof // For Compat types, we have to "extract" the underlying types before
  // performing validation.
  (e = getModularInstance(e)) || e instanceof FieldPath ? __PRIVATE_parseUpdateVarargs(o, "updateDoc", t._key, e, n, r) : __PRIVATE_parseUpdateData(o, "updateDoc", t._key, e);
  return executeWrite(s, [i.toMutation(t._key, Precondition.exists(true))]);
}
function deleteDoc(t) {
  return executeWrite(__PRIVATE_cast(t.firestore, Firestore), [new __PRIVATE_DeleteMutation(t._key, Precondition.none())]);
}
function addDoc(t, e) {
  const n = __PRIVATE_cast(t.firestore, Firestore), r = doc(t), s = __PRIVATE_applyFirestoreDataConverter(t.converter, e), o = __PRIVATE_newUserDataReader(t.firestore);
  return executeWrite(n, [__PRIVATE_parseSetData(o, "addDoc", r._key, s, null !== t.converter, {}).toMutation(r._key, Precondition.exists(false))]).then((() => r));
}
function onSnapshot(t, ...e) {
  t = getModularInstance(t);
  let n = {
    includeMetadataChanges: false,
    source: "default"
  }, r = 0;
  "object" != typeof e[r] || __PRIVATE_isPartialObserver(e[r]) || (n = e[r++]);
  const s = {
    includeMetadataChanges: n.includeMetadataChanges,
    source: n.source
  };
  if (__PRIVATE_isPartialObserver(e[r])) {
    const t2 = e[r];
    e[r] = t2.next?.bind(t2), e[r + 1] = t2.error?.bind(t2), e[r + 2] = t2.complete?.bind(t2);
  }
  let o, i, c;
  if (t instanceof DocumentReference) i = __PRIVATE_cast(t.firestore, Firestore), c = __PRIVATE_newQueryForPath(t._key.path), o = {
    next: (n2) => {
      e[r] && e[r](__PRIVATE_convertToDocSnapshot(i, t, n2));
    },
    error: e[r + 1],
    complete: e[r + 2]
  };
  else {
    const n2 = __PRIVATE_cast(t, Query);
    i = __PRIVATE_cast(n2.firestore, Firestore), c = n2._query;
    const s2 = new __PRIVATE_ExpUserDataWriter(i);
    o = {
      next: (t2) => {
        e[r] && e[r](new QuerySnapshot(i, s2, n2, t2));
      },
      error: e[r + 1],
      complete: e[r + 2]
    }, __PRIVATE_validateHasExplicitOrderByForLimitToLast(t._query);
  }
  const h = ensureFirestoreConfigured(i);
  return __PRIVATE_firestoreClientListen(h, c, s, o);
}
function onSnapshotResume(t, e, ...n) {
  const r = getModularInstance(t), s = (
    /**
    * Ensures the data required to construct an {@link onSnapshot} listener exist in a `snapshotJson`
    * object that originates from {@link DocumentSnapshot.toJSON} or {@link Querysnapshot.toJSON}. The
    * data is normalized into a typed object.
    *
    * @param snapshotJson - The JSON object that the app provided to {@link onSnapshot}.
    * @returns A normalized object that contains all of the required bundle JSON fields. If
    * {@link snapshotJson} doesn't contain the required fields, or if the fields exist as empty
    * strings, then the {@link snapshotJson.error} field will be a non empty string.
    *
    * @internal
    */
    (function __PRIVATE_normalizeSnapshotJsonFields(t2) {
      const e2 = {
        bundle: "",
        bundleName: "",
        bundleSource: ""
      }, n2 = ["bundle", "bundleName", "bundleSource"];
      for (const r2 of n2) {
        if (!(r2 in t2)) {
          e2.error = `snapshotJson missing required field: ${r2}`;
          break;
        }
        const n3 = t2[r2];
        if ("string" != typeof n3) {
          e2.error = `snapshotJson field '${r2}' must be a string.`;
          break;
        }
        if (0 === n3.length) {
          e2.error = `snapshotJson field '${r2}' cannot be an empty string.`;
          break;
        }
        "bundle" === r2 ? e2.bundle = n3 : "bundleName" === r2 ? e2.bundleName = n3 : "bundleSource" === r2 && (e2.bundleSource = n3);
      }
      return e2;
    })(e)
  );
  if (s.error) throw new FirestoreError(D.INVALID_ARGUMENT, s.error);
  let a, o = 0;
  if ("object" != typeof n[o] || __PRIVATE_isPartialObserver(n[o]) || (a = n[o++]), "QuerySnapshot" === s.bundleSource) {
    let t2 = null;
    if ("object" == typeof n[o] && __PRIVATE_isPartialObserver(n[o])) {
      const e2 = n[o++];
      t2 = {
        next: e2.next,
        error: e2.error,
        complete: e2.complete
      };
    } else t2 = {
      next: n[o++],
      error: n[o++],
      complete: n[o++]
    };
    return (function __PRIVATE_onSnapshotQuerySnapshotBundle(t3, e2, n2, r2, s2) {
      let a2, o2 = false;
      const i = loadBundle(t3, e2.bundle);
      return i.then((() => namedQuery(t3, e2.bundleName))).then(((t4) => {
        if (t4 && !o2) {
          s2 && t4.withConverter(s2), a2 = onSnapshot(t4, n2 || {}, r2);
        }
      })).catch(((t4) => (r2.error && r2.error(t4), () => {
      }))), () => {
        o2 || (o2 = true, a2 && a2());
      };
    })(r, s, a, t2, n[o]);
  }
  if ("DocumentSnapshot" === s.bundleSource) {
    let t2 = null;
    if ("object" == typeof n[o] && __PRIVATE_isPartialObserver(n[o])) {
      const e2 = n[o++];
      t2 = {
        next: e2.next,
        error: e2.error,
        complete: e2.complete
      };
    } else t2 = {
      next: n[o++],
      error: n[o++],
      complete: n[o++]
    };
    return (function __PRIVATE_onSnapshotDocumentSnapshotBundle(t3, e2, n2, r2, s2) {
      let a2, o2 = false;
      const i = loadBundle(t3, e2.bundle);
      return i.then((() => {
        if (!o2) {
          const o3 = new DocumentReference(t3, s2 || null, DocumentKey.fromPath(e2.bundleName));
          a2 = onSnapshot(o3, n2 || {}, r2);
        }
      })).catch(((t4) => (r2.error && r2.error(t4), () => {
      }))), () => {
        o2 || (o2 = true, a2 && a2());
      };
    })(r, s, a, t2, n[o]);
  }
  throw new FirestoreError(D.INVALID_ARGUMENT, `unsupported bundle source: ${s.bundleSource}`);
}
function onSnapshotsInSync(t, e) {
  t = __PRIVATE_cast(t, Firestore);
  const n = ensureFirestoreConfigured(t), r = __PRIVATE_isPartialObserver(e) ? e : {
    next: e
  };
  return __PRIVATE_firestoreClientAddSnapshotsInSyncListener(n, r);
}
function executeWrite(t, e) {
  const n = ensureFirestoreConfigured(t);
  return __PRIVATE_firestoreClientWrite(n, e);
}
function __PRIVATE_convertToDocSnapshot(t, e, n) {
  const r = n.docs.get(e._key), s = new __PRIVATE_ExpUserDataWriter(t);
  return new DocumentSnapshot(t, s, e._key, r, new SnapshotMetadata(n.hasPendingWrites, n.fromCache), e.converter);
}
function writeBatch(t) {
  return t = __PRIVATE_cast(t, Firestore), ensureFirestoreConfigured(t), new WriteBatch(t, ((e) => executeWrite(t, e)));
}
function setIndexConfiguration(t, e) {
  t = __PRIVATE_cast(t, Firestore);
  const n = ensureFirestoreConfigured(t);
  if (!n._uninitializedComponentsProvider || "memory" === n._uninitializedComponentsProvider._offline.kind)
    return __PRIVATE_logWarn("Cannot enable indexes when persistence is disabled"), Promise.resolve();
  const r = (function __PRIVATE_parseIndexes(t2) {
    const e2 = "string" == typeof t2 ? (function __PRIVATE_tryParseJson(t3) {
      try {
        return JSON.parse(t3);
      } catch (t4) {
        throw new FirestoreError(D.INVALID_ARGUMENT, "Failed to parse JSON: " + t4?.message);
      }
    })(t2) : t2, n2 = [];
    if (Array.isArray(e2.indexes)) for (const t3 of e2.indexes) {
      const e3 = __PRIVATE_tryGetString(t3, "collectionGroup"), r2 = [];
      if (Array.isArray(t3.fields)) for (const e4 of t3.fields) {
        const t4 = __PRIVATE_tryGetString(e4, "fieldPath"), n3 = __PRIVATE_fieldPathFromDotSeparatedString("setIndexConfiguration", t4);
        "CONTAINS" === e4.arrayConfig ? r2.push(new IndexSegment(
          n3,
          2
          /* IndexKind.CONTAINS */
        )) : "ASCENDING" === e4.order ? r2.push(new IndexSegment(
          n3,
          0
          /* IndexKind.ASCENDING */
        )) : "DESCENDING" === e4.order && r2.push(new IndexSegment(
          n3,
          1
          /* IndexKind.DESCENDING */
        ));
      }
      n2.push(new FieldIndex(FieldIndex.UNKNOWN_ID, e3, r2, IndexState.empty()));
    }
    return n2;
  })(e);
  return __PRIVATE_firestoreClientSetIndexConfiguration(n, r);
}
function __PRIVATE_tryGetString(t, e) {
  if ("string" != typeof t[e]) throw new FirestoreError(D.INVALID_ARGUMENT, "Missing string value for: " + e);
  return t[e];
}
var PersistentCacheIndexManager = class {
  /** @hideconstructor */
  constructor(t) {
    this._firestore = t, /** A type string to uniquely identify instances of this class. */
    this.type = "PersistentCacheIndexManager";
  }
};
function getPersistentCacheIndexManager(t) {
  t = __PRIVATE_cast(t, Firestore);
  const e = Kt.get(t);
  if (e) return e;
  const n = ensureFirestoreConfigured(t);
  if ("persistent" !== n._uninitializedComponentsProvider?._offline.kind) return null;
  const r = new PersistentCacheIndexManager(t);
  return Kt.set(t, r), r;
}
function enablePersistentCacheIndexAutoCreation(t) {
  __PRIVATE_setPersistentCacheIndexAutoCreationEnabled(t, true);
}
function disablePersistentCacheIndexAutoCreation(t) {
  __PRIVATE_setPersistentCacheIndexAutoCreationEnabled(t, false);
}
function deleteAllPersistentCacheIndexes(t) {
  const e = ensureFirestoreConfigured(t._firestore);
  __PRIVATE_firestoreClientDeleteAllFieldIndexes(e).then(((t2) => __PRIVATE_logDebug("deleting all persistent cache indexes succeeded"))).catch(((t2) => __PRIVATE_logWarn("deleting all persistent cache indexes failed", t2)));
}
function __PRIVATE_setPersistentCacheIndexAutoCreationEnabled(t, e) {
  const n = ensureFirestoreConfigured(t._firestore);
  __PRIVATE_firestoreClientSetPersistentCacheIndexAutoCreationEnabled(n, e).then(((t2) => __PRIVATE_logDebug(`setting persistent cache index auto creation isEnabled=${e} succeeded`))).catch(((t2) => __PRIVATE_logWarn(`setting persistent cache index auto creation isEnabled=${e} failed`, t2)));
}
var Kt = /* @__PURE__ */ new WeakMap();
var TestingHooks = class {
  constructor() {
    throw new Error("instances of this class should not be created");
  }
  /**
   * Registers a callback to be notified when an existence filter mismatch
   * occurs in the Watch listen stream.
   *
   * The relative order in which callbacks are notified is unspecified; do not
   * rely on any particular ordering. If a given callback is registered multiple
   * times then it will be notified multiple times, once per registration.
   *
   * @param callback - the callback to invoke upon existence filter mismatch.
   *
   * @returns a function that, when called, unregisters the given callback; only
   * the first invocation of the returned function does anything; all subsequent
   * invocations do nothing.
   */
  static onExistenceFilterMismatch(t) {
    return __PRIVATE_TestingHooksSpiImpl.instance.onExistenceFilterMismatch(t);
  }
};
var __PRIVATE_TestingHooksSpiImpl = class ___PRIVATE_TestingHooksSpiImpl {
  constructor() {
    this.t = /* @__PURE__ */ new Map();
  }
  static get instance() {
    return Xt || (Xt = new ___PRIVATE_TestingHooksSpiImpl(), __PRIVATE_setTestingHooksSpi(Xt)), Xt;
  }
  o(t) {
    this.t.forEach(((e) => e(t)));
  }
  onExistenceFilterMismatch(t) {
    const e = /* @__PURE__ */ Symbol(), n = this.t;
    return n.set(e, t), () => n.delete(e);
  }
};
var Xt = null;
!(function __PRIVATE_registerFirestore(h, d = true) {
  __PRIVATE_setSDKVersion(SDK_VERSION), _registerComponent(new Component("firestore", ((t, { instanceIdentifier: e, options: n }) => {
    const r = t.getProvider("app").getImmediate(), s = new Firestore(new __PRIVATE_FirebaseAuthCredentialsProvider(t.getProvider("auth-internal")), new __PRIVATE_FirebaseAppCheckTokenProvider(r, t.getProvider("app-check-internal")), __PRIVATE_databaseIdFromApp(r, e), r);
    return n = __spreadValues({
      useFetchStreams: d
    }, n), s._setSettings(n), s;
  }), "PUBLIC").setMultipleInstances(true)), registerVersion(Ut, Ht, h), // BUILD_TARGET will be replaced by values like esm, cjs, etc during the compilation
  registerVersion(Ut, Ht, "esm2020");
})();
export {
  AbstractUserDataWriter,
  AggregateField,
  AggregateQuerySnapshot,
  Bytes,
  sn as CACHE_SIZE_UNLIMITED,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  FieldPath,
  FieldValue,
  Firestore,
  FirestoreError,
  GeoPoint,
  LoadBundleTask,
  PersistentCacheIndexManager,
  Query,
  QueryCompositeFilterConstraint,
  QueryConstraint,
  QueryDocumentSnapshot,
  QueryEndAtConstraint,
  QueryFieldFilterConstraint,
  QueryLimitConstraint,
  QueryOrderByConstraint,
  QuerySnapshot,
  QueryStartAtConstraint,
  SnapshotMetadata,
  Timestamp,
  Transaction,
  VectorValue,
  WriteBatch,
  __PRIVATE_AutoId as _AutoId,
  ByteString as _ByteString,
  DatabaseId as _DatabaseId,
  DocumentKey as _DocumentKey,
  __PRIVATE_EmptyAppCheckTokenProvider as _EmptyAppCheckTokenProvider,
  __PRIVATE_EmptyAuthCredentialsProvider as _EmptyAuthCredentialsProvider,
  FieldPath$1 as _FieldPath,
  TestingHooks as _TestingHooks,
  __PRIVATE_cast as _cast,
  __PRIVATE_debugAssert as _debugAssert,
  _internalAggregationQueryToProtoRunAggregationQueryRequest,
  _internalQueryToProtoQueryTarget,
  __PRIVATE_isBase64Available as _isBase64Available,
  __PRIVATE_logWarn as _logWarn,
  __PRIVATE_validateIsNotUsedTogether as _validateIsNotUsedTogether,
  addDoc,
  aggregateFieldEqual,
  aggregateQuerySnapshotEqual,
  and,
  arrayRemove,
  arrayUnion,
  average,
  clearIndexedDbPersistence,
  collection,
  collectionGroup,
  connectFirestoreEmulator,
  count,
  deleteAllPersistentCacheIndexes,
  deleteDoc,
  deleteField,
  disableNetwork,
  disablePersistentCacheIndexAutoCreation,
  doc,
  documentId,
  documentSnapshotFromJSON,
  enableIndexedDbPersistence,
  enableMultiTabIndexedDbPersistence,
  enableNetwork,
  enablePersistentCacheIndexAutoCreation,
  endAt,
  endBefore,
  ensureFirestoreConfigured,
  executeWrite,
  getAggregateFromServer,
  getCountFromServer,
  getDoc,
  getDocFromCache,
  getDocFromServer,
  getDocs,
  getDocsFromCache,
  getDocsFromServer,
  getFirestore,
  getPersistentCacheIndexManager,
  increment,
  initializeFirestore,
  limit,
  limitToLast,
  loadBundle,
  memoryEagerGarbageCollector,
  memoryLocalCache,
  memoryLruGarbageCollector,
  namedQuery,
  onSnapshot,
  onSnapshotResume,
  onSnapshotsInSync,
  or,
  orderBy,
  persistentLocalCache,
  persistentMultipleTabManager,
  persistentSingleTabManager,
  query,
  queryEqual,
  querySnapshotFromJSON,
  refEqual,
  runTransaction,
  serverTimestamp,
  setDoc,
  setIndexConfiguration,
  setLogLevel,
  snapshotEqual,
  startAfter,
  startAt,
  sum,
  terminate,
  updateDoc,
  vector,
  waitForPendingWrites,
  where,
  writeBatch
};
//# sourceMappingURL=firebase_firestore.js.map
