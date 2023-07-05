import React, { useState } from 'react'
import {useMutation} from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
interface books {
    title:string,
    description:string,
    price:number,
    cover:string
}
export default function Add() {
    const [bookInfo,setBookInfo] = useState<books>({
        title:'',
        description:"",
        price:0,
        cover:""
    })
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn:(formData:books)=>{
            return axios.post('http://localhost:4242/books',formData).then(res=>console.log(res)).catch(err=>console.log(err));
        }
    })
    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
      const {name,value} = e.target
      setBookInfo((prev)=>{
        return {
            ...prev,
            [name]:value
        }
      })
    }
    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        mutation.mutate(bookInfo);
        navigate('/');
        window.location.reload();
    }
  return (
    <div className='flex flex-col gap-5 items-center justify-center h-[100vh]'>
        <h2 className='text-4xl  font-semibold'>Add your books</h2>
        <form action="" className='flex flex-col gap-2 w-11/12 max-w-[450px]' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1 '>
                <label className='font-medium'>Title</label>
                <input type='text' value={bookInfo.title} name='title' placeholder='title' onChange={handleChange}
                 className='border outline-none text-sm px-2 py-3'
                />
            </div>
            <div className='flex flex-col gap-1 '> 
                <label className='font-medium'>Description</label>
                <input type='text' value={bookInfo.description} name='description' placeholder='description' onChange={handleChange}
                className='border outline-none text-sm px-2 py-3'
                />
            </div>
            <div className='flex flex-col gap-1 '>
                <label className='font-medium'>Price</label>
                <input type='number' value={bookInfo.price} name='price' placeholder='price' onChange={handleChange}
                className='border outline-none text-sm px-2 py-3'
                />
            </div>
            <div className='flex flex-col gap-1 '>
                <label className='font-medium'>Image link</label>
                <input type='text' value={bookInfo.cover} name='cover' placeholder='cover' onChange={handleChange}
                className='border outline-none text-sm px-2 py-3'
                />
            </div>
            <button type='submit' className='px-4 py-2 rounded-sm bg-violet-700 text-white'>Add</button>
        </form>
    </div>
  )
}
