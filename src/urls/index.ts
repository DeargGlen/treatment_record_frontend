export const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1';
export const individualsIndex = `${DEFAULT_API_LOCALHOST}/individuals`;
export const individualsShow = ({ individualId }: { individualId: number }) =>
  `${DEFAULT_API_LOCALHOST}/individuals/${individualId}`;
export const treatmentsIndex = `${DEFAULT_API_LOCALHOST}/treatments`;
export const usersIndex = `${DEFAULT_API_LOCALHOST}/users`;
export const usersShow = ({ userId }: { userId: number }) =>
  `${DEFAULT_API_LOCALHOST}/users/${userId}`;
