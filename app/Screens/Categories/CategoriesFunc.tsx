import { alert, apiCaling, printError, printLog, printSucess } from "../../Assets/Utils/ExtenFunc"
import { stored } from "../../Constants/Constants"

export const uploadCategories = async (category: string, secretKey: string, secretValue: string) => {

    let params = {
        url: 'category/add',
        method: 'POST',
        body: {
            "category": category
        },
        secret: stored.TOKEN,
        headers: {
            [secretKey]: secretValue,
            'Content-Type': 'application/json'
        }
    }
    try {
        let res = await apiCaling(params)
        return res
    } catch (err) {
        alert("Error in adding categories.")
        printError('error in adding categories', '\u001b[35m', err)
        return err
    }
}

export const loadCategories = async () => {
    let params = {
        url: 'category/getlist',
        method: 'GET',
        secret: stored.TOKEN,
    }
    try {
        let res = await apiCaling(params)
        return res

    } catch (err) {
        alert("Error in loading categories")
        printError('Error in loading categories', '\u001b[35m', err)
        return {
            "message": "Error in loading list",
            "status": false,
            "timestamp": " ",
            "statuscode": 200,
            "details": {
                "category": {
                }
            }
        }
    }
}

export const deleteCategories = async (category: string, secretKey: string, secretValue: string) => {

    let params = {
        url: 'category/delete',
        method: 'DELETE',
        body: {
            "category": category
        },
        secret: stored.TOKEN,
        headers: {
            [secretKey]: secretValue,
            'Content-Type': 'application/json'
        }
    }
    try {
        let res = await apiCaling(params)
        return res
    } catch (err) {
        alert("Error in deleting categories.")
        printError('error in deleting categories', '\u001b[35m', err)
        return err
    }
}

export const updateList = async (newCategory: string, oldCategory: string, secretKey: string, secretValue: string) => {
    // category/updatelist
    let params = {
        url: 'category/updatelist',
        method: 'POST',
        body: {
            "category": newCategory,
            "oldcategory": oldCategory
        },
        secret: stored.TOKEN,
        headers: {
            [secretKey]: secretValue,
            'Content-Type': 'application/json'
        }
    }
    try {
        let res = await apiCaling(params)
        return res
    } catch (err) {
        alert("Error in updating categories.")
        printError('error in updating categories', '\u001b[35m', err)
        return err
    }
}

/*
{
    "message": "List updated successfully",
    "status": true,
    "timestamp": "6/12/2023, 12:35:16 PM",
    "statuscode": 200,
    "details": {
        "category": "My category"
    }
}
*/