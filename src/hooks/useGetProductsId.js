import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const  useGetProductsId = (id) => {
    return useQuery({
        queryKey: ['productsId', id],
        queryFn: async() => {
            const res = await axios.get(`http://localhost:3000/products/${id}`)
            return res.data
        }
    });
}