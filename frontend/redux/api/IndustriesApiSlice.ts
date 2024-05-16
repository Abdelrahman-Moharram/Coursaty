import { apiSlice } from "../services/apiSlice";


const IndustriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getAllIndustries:builder.query({
            query:()=>({
                url:"/industries/",
                method:'GET',
            })
        }),    
        getIndustryById:builder.query({
            query:({id}:{id:string})=>({
                url:`/industries/${id}`,
                method:'GET',
            })
        }),         
    }) 
})


export const {
    useGetAllIndustriesQuery,
    useGetIndustryByIdQuery
} = IndustriesApiSlice