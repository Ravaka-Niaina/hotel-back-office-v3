import React from 'react';
import { ImageList , ImageListItem , Stack} from '@mui/material';
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import {lightBackgroundToTop} from '../CustomizedComponents/NeumorphismTheme';

const ListPicturePreview = (props) => {
    const {itemData} = props;
    console.log(itemData);
    return (
        <div 
            style={{
                display:'flex',
                overflowX:'auto',
                padding:'10px',
                maxWidth:'700px',
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
                            p:2,
                            minWidth:'200px',
                            height:"260px",
                            mr:2
                        }}
                    >
                        <img src={`${item}`} alt='alta' />
                    </CustomizedPaperOutside>
            ))}
        </div>
    );
};

export default ListPicturePreview;