const datetime=new Date();

  const error=(message='')=>{

    console.log();

    return{
        message:message,
        Status:false,
        timestamp: datetime.toLocaleString()
    }
}

 const success=(message='')=>{

    return{
        message:message,
        Status:true,
        timestamp: datetime.toLocaleString() 
    }
}

module.exports ={error,success}