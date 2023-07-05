import axios from "axios"
import { useQuery,useMutation } from "@tanstack/react-query";
import {Link} from 'react-router-dom'
interface book {
    id:number,
    title:string,
    description:string,
    cover:string,
    price:number
}
export default function Books() {
    async function getBooks():Promise<book[]>{
        let books = null
        try {
            const response = await axios.get('http://localhost:4242/books');
            console.log(response.data.data);
            books = response.data.data
        } catch (error) {
            console.log(error)
        }
        return books;
    }
    const {isLoading,error,data} = useQuery({
        queryKey:['books'],
        queryFn:()=>getBooks()
    })
    const mutation = useMutation({
        mutationFn:(id:number)=>{
            return axios.delete(`http://localhost:4242/books/${id}`).then((res)=>console.log(res)).catch((err)=>console.log(err));
        }
    })
    if(isLoading) return <p>Loading...</p>
    if(error instanceof Error) return <p>{error.message}</p>

    function handleDelete(id:number){
        mutation.mutate(id);
        window.location.reload()
    }
  return (
    <div className="w-11/12 max-w-[1260px] mx-auto flex flex-col items-center">
        <h1 className="text-3xl text-center py-4">My book store</h1>
        {mutation.isSuccess && <span className="font-bold text-xs">Successfully deleted</span>}
        <div className="flex flex-wrap justify-center items-center gap-3 ">
            {
                data?.map((book:book)=>{
                    return <div key={book.id} className="flex flex-col border px-4 py-3 h-[350px] w-11/12 max-w-[250px]">
                        {book.cover && <img src={book.cover} className="self-center w-full h-[50%] "/>}
                        <p className="text-2xl">{book.title}</p>
                        <p className="text-md w-11/12 max-w-[250px]">{book.description}</p>
                        <p className="font-bold">${book.price}</p>
                        <div className="flex justify-between">
                            <Link to={`/update/${book.id}`}><button className='border px-3 py-2 cursor-pointer hover:scale-95'>Update</button></Link>
                            <button className='border px-3 py-2 cursor-pointer hover:scale-95' onClick={()=>handleDelete(book.id)}>Delete</button>
                        </div>
                    </div>
                })
            } 
        </div>
        <Link to='/add-books'><button className=" my-10 border px-4 py-2 rounded-md ">Add new book</button></Link>
    </div>
  )
}
