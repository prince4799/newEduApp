import * as extFun from "../../../Assets/Utils/ExtenFunc";
import * as CONSTANTS from '../../../Constants/Constants'

export const asyncRetrieve = async () => {
    try {
        const tokenPromise = extFun.retrieveData('@token', 'Home');
        const secretKeyPromise = extFun.retrieveData('@secretKey', 'home')
        const secretValPromise = extFun.retrieveData('@secretVal', 'Home')
        const [token, secretKey, secretVal] = await Promise.all([tokenPromise, secretKeyPromise, secretValPromise]);
        let key = secretKey.value + '';
        let val = secretVal.value + '';

        let apiParams = {
            url: 'admin/getalluser',
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                [key]: val
            },
            secret: token.value + ''
        }
        try {
            setLoading(true)
            const response = await extFun.apiCaling(apiParams)
            // extFun.printLog('\u001b[34m', response)
            extFun.alert(response.message)
            if (response.status == "true" && response.users) {
                setList(response.users)
                dataArray = list
                setLoading(false)
            }
            if (response.status) {
                setLoading(false)
            }
        } catch (err) {
            extFun.printError("Error in fetching Users", err)
            extFun.alert("Error in fetching Users")
            setLoading(false)
        }
    } catch (error) {
        extFun.printError("Home", error); // Handle any errors here
    }
};

export const updateUser =async ()=>{
    
}