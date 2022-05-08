export const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1';
export const individualsIndex = `${DEFAULT_API_LOCALHOST}/individuals.json`;
export const individualShow = (individualId: string) =>
  `${DEFAULT_API_LOCALHOST}/individuals/${individualId}.json`;
export const treatmentsIndex = `${DEFAULT_API_LOCALHOST}/treatments.json`;
export const usersIndex = `${DEFAULT_API_LOCALHOST}/users`;
export const userShow = (userId: number) =>
  `${DEFAULT_API_LOCALHOST}/users/${userId}.json`;
