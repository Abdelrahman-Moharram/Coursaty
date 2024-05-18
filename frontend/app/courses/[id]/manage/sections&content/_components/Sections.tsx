'use client'
import React, { useState, SyntheticEvent} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { MdExpandMore } from "react-icons/md";
import Content from './Content';
import { ImageSkeleton } from '@/Components/Common';
import { FaFile } from "react-icons/fa";


interface contentType{
  id: string;
  name: string;
  file: string;
  video: string
}



interface section{
  id: string;
  name: string;
  content_set: contentType[];

}

interface Props{
  sections: section[]
}
export default function Sections({sections}:Props) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const handleSkeleton = ()=>{
    const total = []
    for (let index = 0; index < Math.random() * 10; index++) {
      total.push(
        <ImageSkeleton shadow key={index} width='100%' height='50px' rounded='10px' />
      )
    }
    return total
  }
  return (
    <div className='px-1'>
      {
        sections?
          sections.map(section=>(

            <Accordion key={section.id} expanded={expanded === `${section.id}`} onChange={handleChange(`${section.id}`)}>

              <AccordionSummary
                expandIcon={<MdExpandMore  />}
                aria-controls={`${section.id}bh-content`}
                id={`${section.id}bh-header`}
              >
                
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  {section.name}
                </Typography>


                <Typography sx={{ color: 'text.secondary' }}>({section.content_set.length})</Typography>

              </AccordionSummary>

              <AccordionDetails>
                {
                  section.content_set?.length?
                    section.content_set.map(content=>(
                      <Content key={content.id} content={content} />
                    ))
                  :
                    <p className='font-semibold ml-3 flex items-center gap-2 text-gray-600'> 
                      <FaFile />
                      No Content added yet
                    </p>
                }
              </AccordionDetails>
            </Accordion>
          ))
        :
          handleSkeleton()
      }
    </div>
  );
}
