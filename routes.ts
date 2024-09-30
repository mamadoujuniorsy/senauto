/**
 * un tableau de routes accessibles au public
 * ces routes ne nécessitent pas du tout de s'authentifier
 * @type {sting[]}
 */
export const publicRoutes = [
  "/",
];

/**
 * un tableau de routes non accessibles au public
 * ces routes nécessitent de s'authentifier
 * et redirigent les utilisateurs connectés vers settings
 * @type {sting[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
];
/**
 * un string qui contient le préfixe des routes 
 * d'authentifications
 * @type {sting}
 */
export const apiAuthPrefix = "/api/auth"
/**
 * un string qui contient la redirection des 
 * utilisateurs aprés authentification
 * @type {sting}
 */
export const DEFAULT_LOGIN_REDIRECT = "/series"