const datetime=new Date();

  const error=(message=null)=>{

    console.log();

    return{
        message:message,
        status:false,
        timestamp: datetime.toLocaleString()
    }
}

 const success=(message='')=>{

    return{
        message:message,
        status:true,
        timestamp: datetime.toLocaleString() 
    }
}

module.exports ={error,success}