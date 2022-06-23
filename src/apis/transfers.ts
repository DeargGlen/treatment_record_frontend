import {
  transfersIndex,
  transferCreate,
  transferShow,
  transferDestroy,
  transferUpdate,
} from 'urls/index';
import Cookies from 'js-cookie';
import client from './client';

type TransferEntry = {
  id: number;
  individualId: string;
  prevBlockId: number;
  prevAreaName: string;
  prevBarnName: string;
  prevBlockNo: string;
  afterBlockId: number;
  afterAreaName: string;
  afterBarnName: string;
  afterBlockNo: string;
};

export type TRANSFER = {
  id: number;
  date: string;
  completed: boolean;
  transferEntries: TransferEntry[];
};

export type TRANSFER_POST_PROPS = {
  id?: number;
  date: string | null;
  completed?: boolean;
  individualEntries: string[];
  prevBlockIdEntries: number[];
  afterBlockIdEntries: number[];
};

export type TRANSFER_COMPLETE_PROPS = {
  id: number;
  completed: boolean;
};

export type TRANSFER_SHOW_DATA = {
  id: number;
  date: string | null;
  completed: boolean | null;
  transferEntries: TransferEntry[];
};

type TRANSFER_SHOW_RES = {
  data: TRANSFER_SHOW_DATA;
};

export type TRANSFERS_DATA = {
  transfers: TRANSFER[];
};

type TRANSFERS_RES = {
  data: TRANSFERS_DATA;
};

export type INDIVIDUALS_LOCATION = {
  id: string;
  prevBlockId: number;
  afterBlockId: number;
};

export type TRANSFER_INDIVIDUAL = {
  id: string;
  prevBlockId: number;
  afterBlockId?: number;
  prevAreaName?: string;
  prevBarnName?: string;
  prevBlockNo?: string;
  afterAreaName?: string;
  afterBarnName?: string;
  afterBlockNo?: string;
};

export const fetchTransfers = () =>
  client
    .get(transfersIndex, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: TRANSFERS_RES) => res.data)
    .catch(() => ({ transfers: [] }));

export const postTransfer = (params: TRANSFER_POST_PROPS) =>
  client
    .post(
      transferCreate,
      {
        date: params.date,
        completed: params.completed,
        individual_entries: params.individualEntries,
        prev_block_id_entries: params.prevBlockIdEntries,
        after_block_id_entries: params.afterBlockIdEntries,
      },
      {
        headers: {
          'access-token': Cookies.get('_access_token') || '',
          client: Cookies.get('_client') || '',
          uid: Cookies.get('_uid') || '',
        },
      },
    )
    .then((res: TRANSFER_SHOW_RES) => res.data)
    .catch(() => null);

export const fetchTransfer = (transferId: number) =>
  client
    .get(transferShow(transferId), {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: TRANSFER_SHOW_RES) => res.data)
    .catch(() => ({
      id: 0,
      date: null,
      individualsEntry: [],
      prevBlockIdEntry: [],
      afterBlockIdEntry: [],
    }));

export const destroyTransfer = (transferId: number) =>
  client
    .delete(transferDestroy(transferId), {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: TRANSFER_SHOW_RES) => res.data)
    .catch(() => null);

export const updateTransfer = (params: TRANSFER_COMPLETE_PROPS) =>
  client
    .put(
      transferUpdate(params.id ?? 0),
      {
        completed: params.completed,
      },
      {
        headers: {
          'access-token': Cookies.get('_access_token') || '',
          client: Cookies.get('_client') || '',
          uid: Cookies.get('_uid') || '',
        },
      },
    )
    .then((res: TRANSFER_SHOW_RES) => res.data)
    .catch((e) => {
      throw e;
    });
