import React, {useState , useEffect} from 'react';
import { Stack, MenuItem,FormControlLabel,RadioGroup,Switch, IconButton } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CustomizedInput from '../components/CustomizedComponents/CustomizedInput';
import CustomizedSelect from '../components/CustomizedComponents/CustomizedSelect';
import CustomizedCheckbox from '../components/CustomizedComponents/CustomizedCheckbox';
import CustomizedRadio from '../components/CustomizedComponents/CustomizedRadio';
import CustomizedToggle from '../components/CustomizedComponents/CustomizedToggle';
import CustomizedSwitch from '../components/CustomizedComponents/CustomizedSwitch';

const style = {
  content: {
    backgroundColor: '#D6E3F3',
    
    height: 900,
    padding: 30,
  },
  text: {
    fontFamily: 'Raleway',
    fontStyle: 'Regular',
    fontSize: '21px',
    lineHeight: '20px',
    align: 'Left',
    verticalAlign: 'Top',
    letterSpacing: '-0.4px',
    color: '#8B9EB0',
  },
};

const TestFormulaire = () => {

  const [ list , setList ] = useState(new Array(0));
  const [disabled,setDisabled]= React.useState(false);
  const [selected , setSelected ] = useState(new Array(0));
  const [ dragging , setDragging ] = useState(false);
  
  useEffect(()=>{
    const items = [...new Array(20)].map((e,i)=>`item${i}`);
    setList(list=>[...items]);
    setSelected(selectd => [...selectd , items[0]]);
  
  },[])

  const handleSelected = (item) => {
    console.log(selected);
  };


  const handleSelect = (e, item) => {
    const direction = e.dataTransfer.types[0];
    console.log(direction);
    console.log(selected)
    console.log(item);
    const newItemIndex = list.indexOf(item);
    const firstItemSelectedIndex = list.indexOf(selected[0]);
    const lastItemSelectedIndex = list.indexOf(selected[selected.length - 1]);
    if (direction === 'right' && !(newItemIndex < firstItemSelectedIndex)){
      if (!selected.includes(item)) {
        setSelected(oldSelected => (list.filter((e, i) => i <= newItemIndex && i >= firstItemSelectedIndex )));
      }
      else {
        
        console.log('ITEM IN SELECTEDDDD RIGHT');
        setSelected(oldSelected => (oldSelected.slice(0, oldSelected.indexOf(item)+1)));
      }   
    }
    else if (direction === 'left' && !(newItemIndex > lastItemSelectedIndex)){
      if (!selected.includes(item)) {
        
        setSelected(oldSelected => (list.filter((e, i) => i >= newItemIndex && i <= lastItemSelectedIndex)));
      }
      else {
        console.log('ITEM IN SELECTEDDDD LEFT');
        setSelected(oldSelected => (oldSelected.slice(oldSelected.indexOf(item), oldSelected.length)));
      }   
    }
  }
  const handleDragStart = (e,direction) => {
    const crt = document.createElement('div');
    crt.style.visibility = "hidden"; /* or visibility: hidden, or any of the above */
    e.dataTransfer.setDragImage(crt, 0, 0);
    e.dataTransfer.clearData();
    e.dataTransfer.setData(direction,direction);
    // ev.dataTransfer.setDragImage(img, -50, -50);
  }
  
  return (
    <Stack sx={style.content} spacing={3}>
      <table style={{ border: '1px solid #e0e0e0',borderCollapse:'collapse' }}>
        <tbody>
          <tr style={{ border: '1px solid #e0e0e0' }}>
            {
              list.map((item,i)=>{
               return (
                  <th 
                    key={i}
                    style={{
                      paddingRight:"15px",
                      paddingLeft:"15px",
                      width:"50px",
                      height:"50px",
                      background: selected.includes(item) ? "#b2d5f8" : "none",
                      position:'relative',
                      border: '1px solid #e0e0e0'
                    }} 
                    onClick={()=>handleSelected(item)}
                    onDragEnter={(e) => {
                      handleSelect(e,item);
                    }}
                  >
                  {`${item}`}
                   {
                     selected.length > 0 &&
                     selected[0] === item && (


                      <span 
                        style={{ 
                          cursor: 'ew-resize',
                           position: 'absolute',
                           left: '-10px',
                           zIndex: '2',
                        }} 
                        onDragStart={(e) => handleDragStart(e, 'left')} 
                        draggable
                      >
                         <ArrowCircleLeftIcon sx={{ color:'#2476d2'}}/>
                      </span>

                     )

                   }
                    {
                      selected.length>0 && 
                        selected[selected.length-1] === item && (
                        
                            
                       <span 
                        style={{ 
                          cursor:'ew-resize',
                          position:'absolute',
                          right:'-10px',
                          zIndex:'2',
                        }} 
                        onDragStart={(e)=>handleDragStart(e,'right')} 
                        draggable
                        >
                         <ArrowCircleRightIcon sx={{ color:'#2476d2'}}/>
                        </span>
                         
                        )
                      
                    }
                   
                   
                  </th>
                
                )
              }
              )
            }
          </tr>
        </tbody>
      </table>
      
      <span style={style.text}>Text fields</span>

      {/* <CustomizedInput/> */}

      <CustomizedInput placeholder="Test" variant="outlined" />
      <CustomizedSelect placeholder="Test" variant="outlined">
        <MenuItem disabled value="">
          <em>Placeholder</em>
        </MenuItem>
        <MenuItem selected value={10}>
          Ten
        </MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </CustomizedSelect>
      <CustomizedCheckbox defaultChecked />
      <RadioGroup
        defaultValue="female"
        aria-labelledby="demo-customized-radios"
        name="customized-radios"
      >
        <FormControlLabel value="female" control={<CustomizedRadio />} label="Female" />
        <FormControlLabel value="male" control={<CustomizedRadio />} label="Male" />
      </RadioGroup>
      <FormControlLabel value="female" control={<CustomizedToggle defaultChecked /> } label="Activé" />
      <FormControlLabel value="female" control={<Switch checked={!disabled} onClick={() => setDisabled(!disabled)}/> } label="Disable" />
      <FormControlLabel value="female" control={<CustomizedSwitch defaultChecked disabled={disabled}/> } label="Female" />
    </Stack>
  );
}

export default TestFormulaire;
