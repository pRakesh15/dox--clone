import React from 'react'

interface documentProps {
    params:Promise<{documentId:string}> //assign the params to a promise to make sure the id is fetch successfully
}

const page=async({params}: documentProps) =>{
  const {documentId}=await params   //call by the params using await
 
  return (
    <div>document iid is {documentId}</div>
  )
}

export default page