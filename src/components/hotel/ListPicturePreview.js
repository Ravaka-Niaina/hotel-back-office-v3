import React from 'react';
import { ImageList, ImageListItem, Stack, IconButton  } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import {lightBackgroundToTop} from '../CustomizedComponents/NeumorphismTheme';



const previewCropping = (width,height,newHeight) => {
    
    const croppedWidth = newHeight * (width / height);
    // console.log(`w:${window.innerWidth}`);
    // console.log(`h:${window.innerHeight}`);
    // console.log(`width:${width} , height: ${height}, newWidth:${croppedWidth}`);
    return croppedWidth;
} ;
const ListPicturePreview = (props) => {
    const {itemData , setPictureList} = props;
    const handleDeleteItem = (index) =>{
        const newArray = itemData;
        newArray.splice(index,1);
        setPictureList([...newArray]);
    }
    return (
        <div 
            style={{
                display:'flex',
                overflowX:'auto',
                padding:'15px',
                width:'700px',
                height:'280',
                background:'transparent',
                border:'1px solid transparent'
            }}
        >
            {itemData.map((item,i) => (
                    <CustomizedPaperOutside 
                        key={i} 
                        sx={{
                            ...lightBackgroundToTop,
                            p:'1px',
                            minWidth:`${previewCropping(item.width,item.height,200)}px`,
                            height:"200px",
                            mr:2,
                            position: 'relative',
                        }}
                    >
                    <IconButton aria-label="delete" size="small" 
                        sx={{
                            border:'1px white solid',
                            background:'rgba(0,0,0,0.6)',
                            position:'absolute',
                            zIndex:2,
                            top: '10px',
                            right: '10px',
                            color:"white",

                        }}
                        onClick={()=>handleDeleteItem(i)}
                    >
                        <DeleteForeverIcon />
                    </IconButton>  
                    <img src={`${item.img}`} alt='alta' style={{ height: `200px`, width: `${previewCropping(item.width, item.height, 200)}`,borderRadius:'15px'}}/>
                    </CustomizedPaperOutside>
            ))}
        </div>
    );
};

export default ListPicturePreview;