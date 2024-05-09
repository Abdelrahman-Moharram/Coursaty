import { apiSlice } from "../services/apiSlice";


const homeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
            getAllCoursesPage:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:"/courses",
                    method:'GET',
                    params:{page:page, size:size}
                })
            })
    }) 
})


export const {
    useGetAllCoursesPageQuery
} = homeApiSlice