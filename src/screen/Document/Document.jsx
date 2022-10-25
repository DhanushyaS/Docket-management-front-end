import React, {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import FileBase64 from 'react-file-base64';
import './Document.css'
import axios from 'axios'


function Document() {
  const user = JSON.parse(localStorage.getItem("user"))
  const [doc, setDoc] = useState()
  const {id} = useParams()
  const navigate=useNavigate()
  const doc_id=id
  axios.get(`https://docket-management.herokuapp.com/doc/docs/${doc_id}`)  
    .then(res => {  
      setDoc(res.data)
    })

    const [img, setImage] = useState({ title: '', image: '' });
  const [name,setName]=useState('')
  const [content,setContent]=useState('')
  const [i,setIndex]=useState(0)
  const [subName,setSubName]=useState()
  const [subdocID,setSubDocID]=useState()
  const [showContent,setShowContent]=useState(true)
  const [showDocs, setShowDocs] = useState(false)
  const [prevVisible, setPrevVisible] = useState(false)
  const [addSubDocs, setAddSubDocs] = useState(false)
  const [showImageForm, setImageForm] = useState(false)
  const [subImage,setSubImage] = useState([])
  const [showEditSub,setShowEditSub]=useState(false)
  const [prev, setPrevURL] = useState('')
  const contentChange=event=>{
    setContent(event.target.value)
  }

  const previewClose =()=>{
    setPrevVisible(!prevVisible)
  }
  
  const handleAddSubDocs = () =>{
      setAddSubDocs(true)
  }
  const subDocClose = () =>{
    setAddSubDocs(false)
  }
  
  const toggleDocsView=()=>{
    setShowDocs(!showDocs)
  }

  const handleEditContent =async()=>{
    await axios({
      method: 'post',
      url: `https://docket-management.herokuapp.com/doc/docs/${doc_id}/${subdocID}`,
      data: {content}
    }).then(res => {  
      setDoc(res.data)
    })
  }
  const handleAddSubDocSubmit =async()=>{
    const content =` /***   Here You Can Write Your Content   ***/`
    await axios({
      method: 'post',
      url: `https://docket-management.herokuapp.com/doc/docs/${doc_id}/add`,
      data: {name,content}
    }).then(res => {  
      setDoc(res.data)
      setName('')
      setAddSubDocs(false)
    })
  }

  const handleAddImage =async()=>{
    setImageForm(false)
    await axios({
      method: 'post',
      url: `https://docket-management.herokuapp.com/doc/image/${doc_id}/${subdocID}`,
      data: img
    }).then(res => {  
      setSubImage(res.data.image)
    })
  }

  return (
    <div className='row mx-0'>
        <div className="col-md-3 dark text-light border-end border-secondary vh-100">
          <div className='d-flex align-items-center justify-content-between'>
          <div>
            <div className='m-3 fs-4 fw-bold'>{doc?doc.name:"Title"}</div>
          </div>
            <div className='m-3'>
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"> <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg> */}
            </div>
          </div>
          <div className='desc mx-3'>{doc?doc.description:"Document Description"}</div>
          <div className='m-3 mt-5 fs-5 fw-bolder d-flex align-items-center justify-content-between'>
            <div>Documents</div>
            <div className='d-flex align-items-center'>
              <div className='mx-2' onClick={handleAddSubDocs}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16"><path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/><path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/></svg>
              </div>
              <div onClick={toggleDocsView} className="mx-2">
              {showDocs?
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>
              : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/></svg>
              }
              </div>
            </div>
          </div>
          {
            !showDocs &&
            (
              <div className='mx-4 fs-5'>
              {doc &&
              <div>
              {doc.subDocument.map((ele,index)=>{
                return(
                  <div>
              <div className='d-flex align-items-center justify-content-between my-1' key={index}>
                <div>{ele.name}</div>
                <div className='d-flex align-items-center'>
                  <div className='mx-2' onClick={()=>{setShowEditSub(true)
                    setSubName(ele.name)
                    setSubDocID(ele._id)}}>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>
                  </div>
                  <div className='mx-2' >
                  <svg onClick={async()=>{
                     await axios({
      method: 'get',
      url: `https://docket-management.herokuapp.com/doc/docs/${doc_id}/${ele._id}`,
    }).then(res => {  
      setDoc(res.data)
    })
                  }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/></svg>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className="col-md-5">
                <div className='fs-6 text-end content' onClick={()=>{setShowContent(true)
                setIndex(index)
                setSubDocID(ele._id)}}>Content</div>
                </div>
                <div className="col-md-6">
                <div className='fs-6 content' onClick={async()=>{setShowContent(false)
                setSubDocID(ele._id)
                await axios({
      method: 'get',
      url: `https://docket-management.herokuapp.com/doc/image/${doc_id}/${subdocID}`,
    }).then(res => {  
      setSubImage(res.data.image)
    })
                }
                }>Image</div>
                </div>
              </div>
                  </div>
                )
              })}
              </div>
              
              }
          </div>
            )
          }
        </div>
        <div className="col-md-9 m-0 mt-1">
          {showContent ?
          <div className='vh-100'>
          {(doc && i>=0 && doc.subDocument[i]) ?
            <textarea name="detail" className='textarea p-3'  onChange={contentChange}>{doc.subDocument[i].content}</textarea>
        :    <textarea name="detail" className='textarea p-3' >Create sub document to start your documentation... </textarea>
          
          }
            <div className='d-flex justify-content-between'>
              <button className='btn btn-danger ' onClick={async()=>{
                await axios({
      method: 'get',
      url: `https://docket-management.herokuapp.com/doc/docs/${doc_id}/delete/${user._id}`,     
    }).then(res => {  
      console.log(res)
    })
    await axios.get(`https://docket-management.herokuapp.com/doc/${user._id}`)  
    .then(res => {   
      console.log(res)
      localStorage.setItem("document",JSON.stringify(res.data.document))  
      navigate('/')
    }) 

              }}>Delete the document</button>
              <button className='btn btn-success ' onClick={handleEditContent}>Save</button>
            </div>
          </div> :

            <div className='vh-100 '>
                <div className='textarea'>
                  <div className="row">
                  {subImage.map((ele,index)=>{
                    return(
                    <div className="col-md-3" key={index}>
                      <img height='220px' onClick={()=>{
                        setPrevURL(ele.image)
                        setPrevVisible(!prevVisible)
                      }} className='img-fluid' src={ele.image} alt="" />
                      <div className='text-center my-2'>{ele.title}</div>
                  </div>

                    )
                  })}

                  </div>
                </div>
                <div className='btn btn-success ' onClick={()=>setImageForm(true)}>Add Image</div>
                {prevVisible &&
                
                <div className='preview p-2'>
                  <div className='text-end py-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" onClick={previewClose} className="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
                  </div>
                  <div className='img'>
                  <img className='img-fluid img ' src={prev} alt="" />

                  </div>
                </div>
                }
                
            </div>
          }
          {
            addSubDocs &&
          <div className='bg-dark m-4 p-3 subdoc'>
          <div className='text-end'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" onClick={subDocClose} className="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
          </div>
            <label htmlFor="subdoc" className='form-label mb-4'>Sub Document Name :</label>
            <input type="text" className='form-control mb-4' value={name} onChange={(e)=>setName(e.target.value)}/>
            <button className='btn btn-success' onClick={handleAddSubDocSubmit}>create</button>
          </div>
          }
          {
            showImageForm &&
            <div className='bg-dark m-4 p-3 subdoc'>
          <div className='text-end'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" onClick={()=>setImageForm(false)} className="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
          </div>
            <label htmlFor="subdoc" className='form-label mb-4'>Title :</label>
            <input type="text" className='form-control mb-4' value={img.title} onChange={(e)=>setImage({...img,title:e.target.value})}/>
            <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => setImage({ ...img, image: base64 })}
        />
            <button className='btn btn-success' onClick={handleAddImage}>create</button>
          </div>
          }{
            showEditSub &&
          <div className='bg-dark m-4 p-3 subdoc'>
          <div className='text-end'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" onClick={()=>setShowEditSub(false)} className="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
          </div>
            <label htmlFor="subdoc" className='form-label mb-4'>Name :</label>
            <input type="text" className='form-control mb-4' value={subName} onChange={(e)=>setSubName(e.target.value)} />
            <button className='btn btn-success' onClick={async()=>{
              await axios({
      method: 'post',
      url: `https://docket-management.herokuapp.com/doc/docs/${doc_id}/${subdocID}/edit`,
       data:{name:subName}         
    }).then(res => {  
      setDoc(res.data)
      console.log(res)
      setShowEditSub(false)
    })
            }}>Edit</button>
          </div>

          }
          
        </div>
    </div>
  )
}

export default Document