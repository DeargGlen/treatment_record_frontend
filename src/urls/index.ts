export const DEFAULT_API_LOCALHOST = 'http://192.168.11.6:3000/api/v1';
export const individualsIndex = `${DEFAULT_API_LOCALHOST}/individuals.json`;
export const individualShow = (individualId: string) =>
  `${DEFAULT_API_LOCALHOST}/individuals/${individualId}.json`;
export const individualCreate = `${DEFAULT_API_LOCALHOST}/individuals`;
export const treatmentsIndex = `${DEFAULT_API_LOCALHOST}/treatments.json`;
export const signUpUrl = `${DEFAULT_API_LOCALHOST}/auth`;
export const signInUrl = `${DEFAULT_API_LOCALHOST}/auth/sign_in`;
export const signOutUrl = `${DEFAULT_API_LOCALHOST}/auth/sign_out`;
export const getCurrentUserUrl = `${DEFAULT_API_LOCALHOST}/auth/sessions`;
