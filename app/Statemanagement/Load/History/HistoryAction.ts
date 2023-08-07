import { History, HistoryAction } from "./HistoryInterface";

export function historyRequest(): HistoryAction {
  return { type: 'HISTORY_REQUEST' };
}

export function historySuccess(userid: History): HistoryAction {
  return { type: 'HISTORY_SUCCESS', payload: userid };
}

export function historyFailure(error: string): HistoryAction {
  return { type: 'HISTORY_FAILURE', payload: error };
}