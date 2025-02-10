import React from 'react'
import Editor from './editor'

interface documentProps {
    params:Promise<{documentId:string}> //assign the params to a promise to make sure the id is fetch successfully
}

const page=async({params}: documentProps) =>{
  const {documentId}=await params   //call by the params using await
 
  return (
    <div>document iid is {documentId}
    <div>
      <Editor/>
    </div>
    </div>
  )
}

export default page