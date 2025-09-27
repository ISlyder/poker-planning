/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as functions_room_users from "../functions/room_users.js";
import type * as functions_rooms from "../functions/rooms.js";
import type * as functions_users from "../functions/users.js";
import type * as functions_votes from "../functions/votes.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "functions/room_users": typeof functions_room_users;
  "functions/rooms": typeof functions_rooms;
  "functions/users": typeof functions_users;
  "functions/votes": typeof functions_votes;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
