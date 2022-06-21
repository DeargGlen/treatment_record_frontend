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
  individual_id: string;
  prev_block_id: number;
  after_block_id: number;
};

export type TRANSFER = {
  id: number;
  date: string;
  completed: boolean;
  transferEntries: TransferEntry[];
};

export type TRANSFER_POST_PROPS = {
  id?: number;
  date: string;
  completed: boolean;
  individualEntry: string[];
  prevBlockIdEntry: number[];
  afterBlockIdEntry: number[];
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
    // eslint-disable-next-line no-console
    .catch((e) => console.error(e));

export const postTransfer = (params: TRANSFER_POST_PROPS) =>
  client
    .post(
      transferCreate,
      {
        date: params.date,
        completed: params.completed,
        individual_entry: params.individualEntry,
        prev_block_id_entry: params.prevBlockIdEntry,
        after_block_id_entry: params.afterBlockIdEntry,
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
    .catch((e) => console.error(e));

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
    .catch((e) => console.error(e));

export const updateTransfer = (params: TRANSFER_POST_PROPS) =>
  client
    .put(
      transferUpdate(params.id ?? 0),
      {
        date: params.date,
        completed: params.completed,
        individual_entry: params.individualEntry,
        prev_block_id_entry: params.prevBlockIdEntry,
        after_block_id_entry: params.afterBlockIdEntry,
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
