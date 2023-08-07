import React, { createContext, useContext, useReducer } from 'react';
import { apiCaling, printError, printInfo, printLog, retrieveData } from '../../../Assets/Utils/ExtenFunc';
import { stored } from '../../../Constants/Constants';
import { historyFailure, historyRequest, historySuccess } from './HistoryAction';
import { historyReducer, initialState } from './HistoryReducer';
import * as CONSTANTS from '../../../Constants/Constants'
const HistoryContext=createContext({
    state:initialState,
    dispatch:()=>{ },
    loadHistory:()=>{ },
});
retrieveData('@username', 'historyContex').then(res=> {CONSTANTS.stored.USER_NAME= res.value})

export const HistoryProvider=({children})=>{

    const [state,dispatch]=useReducer(historyReducer,initialState)

    const loadHistory=async (userid) => {
        
        dispatch(historyRequest());

        var options={
          headers:{
            "Content-Type": "application/json",
          },
            body: {
              "userid": CONSTANTS.stored.USER_NAME ,
            },
            method: 'POST',
            url:"history/show/lastactivities",
            secret: 'Yes',
          }

          try {
            // printLog('HistoryProvider', options);
            
            const response = await apiCaling(options);
            if (response.statuscode == 200) {
              console.log("HistoryProvider reponse", response)
              dispatch(historySuccess(response));
            } else {
              dispatch(historyFailure(response));
            }
          } catch (error) {
            printError('HistoryProvider', error);
          }
      
    };
    const value = {
        state,
        dispatch,
        loadHistory,
      }
      return (
        <HistoryContext.Provider value={value}>
          {children}
        </HistoryContext.Provider>
      );
};
export function useLoadHistory(){
    return useContext(HistoryContext)
}