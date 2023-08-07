
export interface History{
    userid:string
}


export interface HistoryState{
    loading:boolean;
    error: string | null;
    data:History|null;
}

export type HistoryAction =
    | { type: 'HISTORY_REQUEST' }
    | { type: 'HISTORY_SUCCESS'; payload: History }
    | { type: 'HISTORY_FAILURE'; payload: string };
