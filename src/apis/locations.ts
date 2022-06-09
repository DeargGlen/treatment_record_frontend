import Cookies from 'js-cookie';
import {
  areaIndex,
  areaCreate,
  barnShow,
  areaDestroy,
  barnCreate,
  barnDestroy,
  blockCreate,
  blockDestroy,
} from 'urls/index';
import { INDIVIDUAL } from 'apis/individuals';
import client from './client';

export type AREA = {
  id: number;
  name: string;
};
export type AREA_WITH_BARNS = {
  id: number;
  name: string;
  barns: BARN[];
};
export type AREAS_DATA = {
  areas: AREA_WITH_BARNS[];
};
export type BARN = {
  id: number;
  name: string;
};
export type AREA_SHOW_DATA = {
  id: number;
  name: string;
  barns: BARN[];
};

export type AREAS_RES = {
  data: AREAS_DATA;
};
type AREA_SHOW_RES = {
  data: AREA_SHOW_DATA;
};
type AREA_POST_PROPS = {
  name: string;
};

export type BLOCK = {
  id: number;
  no: string;
};

export type BLOCK_WITH_INDIVIDUALS = {
  id: number;
  no: string;
  individuals: INDIVIDUAL[];
};

export type BARN_SHOW_DATA = {
  id: number | null;
  name: string;
  blocks: BLOCK_WITH_INDIVIDUALS[];
};

type BARN_SHOW_RES = {
  data: BARN_SHOW_DATA;
};

type BARN_POST_PROPS = {
  name: string;
  id: number;
};
type BLOCK_POST_PROPS = {
  no: string;
  id: number;
};

export const fetchAreas = () =>
  client
    .get(areaIndex, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: AREAS_RES) => res.data)
    .catch((e) => {
      console.error(e);
    });

export const postArea = (params: AREA_POST_PROPS) =>
  client
    .post(
      areaCreate,
      {
        name: params.name,
      },
      {
        headers: {
          'access-token': Cookies.get('_access_token') || '',
          client: Cookies.get('_client') || '',
          uid: Cookies.get('_uid') || '',
        },
      },
    )
    .then((res: AREA_SHOW_RES) => {
      console.log(res);

      return res.data;
    })
    .catch((e) => {
      throw e;
    });

export const destroyArea = (areaId: number) =>
  client
    .delete(areaDestroy(areaId), {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: AREA_SHOW_RES) => {
      console.log(res);

      return res.data;
    })
    .catch((e) => console.error(e));

export const fetchBarn = (barnId: number) =>
  client
    .get(barnShow(barnId), {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: BARN_SHOW_RES) => {
      console.log(res);

      return res.data;
    })
    .catch((e) => console.error(e));

export const destroyBarn = (barnId: number) =>
  client
    .delete(barnDestroy(barnId), {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: AREA_SHOW_RES) => {
      console.log(res);

      return res.data;
    })
    .catch((e) => console.error(e));

export const postBarn = (params: BARN_POST_PROPS) =>
  client
    .post(
      barnCreate,
      {
        name: params.name,
        area_id: params.id,
      },
      {
        headers: {
          'access-token': Cookies.get('_access_token') || '',
          client: Cookies.get('_client') || '',
          uid: Cookies.get('_uid') || '',
        },
      },
    )
    .then((res: AREA_SHOW_RES) => {
      console.log(res);

      return res.data;
    })
    .catch((e) => {
      throw e;
    });

export const destroyBlock = (blockId: number) =>
  client
    .delete(blockDestroy(blockId), {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: AREA_SHOW_RES) => {
      console.log(res);

      return res.data;
    })
    .catch((e) => console.error(e));

export const postBlock = (params: BLOCK_POST_PROPS) =>
  client
    .post(
      blockCreate,
      {
        no: params.no,
        barn_id: params.id,
      },
      {
        headers: {
          'access-token': Cookies.get('_access_token') || '',
          client: Cookies.get('_client') || '',
          uid: Cookies.get('_uid') || '',
        },
      },
    )
    .then((res: AREA_SHOW_RES) => {
      console.log(res);

      return res.data;
    })
    .catch((e) => {
      throw e;
    });
