import React, {useState , useEffect} from 'react';
import { Stack, MenuItem,FormControlLabel,RadioGroup,Switch, IconButton } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
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
    console.log(selected);
  },[])

  const handleSelected = (item) => {
    console.log(selected);
    console.log(item);
    console.log(selected.includes(item));
  };
  const handleSelect = (item) => {
    console.log(item);
    if(!selected.includes(item))
    {
      setSelected(oldSelected => list.filter((e, i) => i < list.findIndex((elem) => elem === item)));
    }
    else if(selected[selected.length-1] !== item){
        setSelected(oldSelected => oldSelected.slice(0, oldSelected.findIndex((elem) => elem === item)+1));
    }  
    
  }
  const handleDrag = (e) => {
    console.log('dragging');
    console.log(e);
    console.log(e.target);
    // ev.dataTransfer.setDragImage(img, -50, -50);
  }
  return (
    <Stack sx={style.content} spacing={3}>
      <table>
        <tbody>
          <tr>
            {
              list.map((item,i)=>{
               return (
                  <th 
                    key={i}
                    style={{
                      border:"1px black solid",
                      background: selected.includes(item) ? "#97E1FF" : "none"
                    }} 
                    onClick={()=>handleSelected(item)}
                    onMouseEnter={() => {
                      handleSelect(item);
                    }}
                  >
                  {`${item}`}
                    {
                      selected.length>0 && 
                        selected[selected.length-1] === item && (
                         <IconButton
                           fontSize="small"
                           
                           onDrag={handleDrag}
                           draggable
                           aria-label="fingerprint"
                           color="success">
                            
                           <ArrowCircleRightIcon />
                         </IconButton>
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
