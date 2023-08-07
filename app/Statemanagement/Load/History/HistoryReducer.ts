import { HistoryAction, HistoryState } from "./HistoryInterface";


export const initialState :HistoryState={
    loading: false,
    error: null,
    data: null,
}

export function historyReducer(state: HistoryState, action: HistoryAction): HistoryState {
    switch (action.type) {
      case 'HISTORY_REQUEST':
        return { ...state, loading: true, error: null };
      case 'HISTORY_SUCCESS':
        return { ...state, loading: false, data: action.payload };
      case 'HISTORY_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  }