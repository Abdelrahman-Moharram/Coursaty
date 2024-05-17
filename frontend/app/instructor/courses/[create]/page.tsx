'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import CourseForm from './_components/CourseForm'
import { useGetIndustriesQuery, useGetCategoriesMutation, useGetSubCategoriesMutation } from '@/redux/api/homeApi'
import { useCreateCourseMutation } from '@/redux/api/Courses'

interface courseFormType{
  name: string
  description: string
  category: string
  subcategory: string
  industry: string
  image: Blob | undefined
  price: number
}

const page = () => {
  const [courseForm, setCourseForm] = useState<courseFormType>({
    name:'',
    description: '',
    category: '',
    subcategory: '',
    industry: '',
    image: undefined,
    price:0
})
const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => {
const { name, value } = event.target;
    
setCourseForm({ ...courseForm, [name]: value });
};
const selectChange = (e: ChangeEvent<HTMLSelectElement> )=>{
    const { name, value } = e.target;        
setCourseForm({ ...courseForm, [name]: value });
}

const imageChange = (e: ChangeEvent<HTMLInputElement> )=>{
    const { name, files } = e.target;        
setCourseForm({ ...courseForm, [name]: files?.length? files[0] : '' });
}
  const {data: industries} = useGetIndustriesQuery(undefined)
  const [getCategory, {data: categories}] = useGetCategoriesMutation()
  const [getSubCategory, {data: subcategories}] = useGetSubCategoriesMutation()
  const [createCourse, {isLoading}] = useCreateCourseMutation()
  useEffect(()=>{   
    if(courseForm.industry)
      getCategory({id:courseForm.industry})
  },[courseForm.industry])

  useEffect(()=>{
    
    if(courseForm.category)
      getSubCategory({id:courseForm.category})
  },[courseForm.category])
  const formSubmit = (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    form.append('name', courseForm.name)
    form.append('description', courseForm.description)
    form.append('category', courseForm.category)
    form.append('industry', courseForm.industry)
    form.append('subcategory', courseForm.subcategory)
    form.append('image', courseForm.image ?? "")
    form.append('price', courseForm.price.toString())
     
    createCourse({form: Object.fromEntries(form)})
  }
  return (
    <div className='w-full mx-auto bg-white rounded-lg my-3 overflow-hidden p-5'>
      <h1 className='text-2xl font-bold my-5'>Create A New Course</h1>
      <CourseForm
        industries={industries?.industries}
        categories={categories?.categories}
        subcategories={subcategories?.subcategories} 
        onChange={onChange}
        selectChange={selectChange}
        imageChange={imageChange}
        courseForm={courseForm}
        formSubmit={formSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}

export default page
