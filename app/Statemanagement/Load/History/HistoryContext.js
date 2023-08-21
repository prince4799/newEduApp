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

  // printLog("CONSTANTS.stored.USER_NAME",CONSTANTS.stored)

    const [state,dispatch]=useReducer(historyReducer,initialState)

    const loadHistory=async (userid) => {
        
        dispatch(historyRequest());

        var list_options={
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
        var category_options={
            headers:{
              "Content-Type": "application/json",
            },
              method: 'GET',
              url:"category/getlist",
              secret: 'Yes',
          }

            printLog("list_options",list_options)
            try {
              const [listResponse, categoryResponse] = await Promise.all([
                apiCaling(list_options),
                apiCaling(category_options),
              ]);
        
              if (listResponse.statuscode === 200 && categoryResponse.statuscode === 200) {
                const data = {
                  List: listResponse,
                  Category: categoryResponse,
                };
                dispatch(historySuccess(data));
                CONSTANTS.stored.UPDATED=false
              } else {
                dispatch(historyFailure('API call failed'));
                CONSTANTS.stored.UPDATED=false

              }
            } catch (error) {
              dispatch(historyFailure(error.message || 'Unknown error occurred'));
              CONSTANTS.stored.UPDATED=false

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