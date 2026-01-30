/**
 * English translation integration file
 *
 * Combines all page/feature-specific translation files into one.
 */

import common from "./common.json";
import auth from "./auth.json";
import errors from "./errors.json";

/**
 * English translation resources
 *
 * To add a new page:
 * 1. Create {pageName}.json file
 * 2. Add import statement
 * 3. Add to the object below
 *
 * @example
 * import dashboard from './dashboard.json';
 * export default {
 *   common,
 *   auth,
 *   errors,
 *   dashboard, // Add new page
 * };
 */
export default {
  ...common, // Common phrases (buttons, labels, etc.)
  ...auth, // Authentication related (login, signup)
  ...errors, // Error messages
};
