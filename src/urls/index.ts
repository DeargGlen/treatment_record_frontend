export const individualsIndex = `/individuals.json`;
export const individualsIndexOnlyUnshipped = `/individuals.json?unshipped=true`;
export const individualsIndexOnlyShipped = `/individuals.json?shipped=true`;
export const individualShow = (individualId: string) =>
  `/individuals/${individualId}.json`;
export const individualCreate = `/individuals`;
export const individualDestroy = (individualId: string) =>
  `/individuals/${individualId}`;
export const individualUpdate = (individualId: string) =>
  `/individuals/${individualId}`;
export const treatmentsIndex = `/treatments.json`;
export const treatmentCreate = `/treatments`;
export const treatmentShow = (treatmentId: number) =>
  `/treatments/${treatmentId}.json`;
export const treatmentDestroy = (treatmentId: number) =>
  `/treatments/${treatmentId}`;
export const treatmentUpdate = (treatmentId: number) =>
  `/treatments/${treatmentId}`;
export const transfersIndex = `/transfers.json`;
export const transferShow = (transferId: number) => `/transfers/${transferId}`;
export const transferCreate = `/transfers`;
export const transferUpdate = (transferId: number) =>
  `/transfers/${transferId}`;
export const transferDestroy = (transferId: number) =>
  `/transfers/${transferId}`;
export const signUpUrl = `/auth`;
export const signInUrl = `/auth/sign_in`;
export const signOutUrl = `/auth/sign_out`;
export const getCurrentUserUrl = `/auth/sessions`;
export const areaIndex = `/areas.json`;
export const areaDestroy = (areaId: number) => `/areas/${areaId}`;
export const areaCreate = `/areas`;
export const barnShow = (barnId: number) => `/barns/${barnId}.json`;
export const barnCreate = `/barns`;
export const barnDestroy = (barnId: number) => `/barns/${barnId}`;
export const blockCreate = `/blocks`;
export const blockDestroy = (blockId: number) => `/blocks/${blockId}`;
export const treatCommentCreate = `/treat_comments`;
export const treatCommentDestroy = (commentId: number) =>
  `/treat_comments/${commentId}`;
export const treatCommentsIndex = `/treat_comments.json`;
export const symptomTagsIndex = `/symptom_tags.json`;
export const symptomTagCreate = `/symptom_tags`;
export const symptomTagDestroy = (tagId: number) => `/symptom_tags/${tagId}`;
export const diseaseTagsIndex = `/disease_tags.json`;
export const diseaseTagCreate = `/disease_tags`;
export const diseaseTagDestroy = (tagId: number) => `/disease_tags/${tagId}`;
export const medicineTagsIndex = `/medicine_tags.json`;
export const medicineTagCreate = `/medicine_tags`;
export const medicineTagDestroy = (tagId: number) => `/medicine_tags/${tagId}`;
export const individualTagsIndex = `/individual_tags.json`;
export const individualTagCreate = `/individual_tags`;
export const individualTagDestroy = (tagId: number) =>
  `/individual_tags/${tagId}`;
