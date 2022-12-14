import React , { useEffect , useState } from 'react';
import { Grid , Stack } from '@mui/material';
import PropTypes from 'prop-types';

import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';

import StatusCell from './cells/StatusCell';

import { CellRoomEditorPopper, SelectableRoomCell } from './cells/room';
import { CellRatePlanEditorPopper , SelectableRatePlanCell } from './cells/rateplan';

import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import CalendarValueSide from './CalendarValueSide';
import CalendarAttributeSide from './CalendarAttributeSide';

import './index.css';
import RowEditorPopper from './RowEditorPopper';

function dateDiff(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY));
}
function initializeDateList(dateRange){
    const date = new Date(dateRange[0].toDate());
    date.setDate(date.getDate() - 1);
    const rangeGap = dateDiff(dateRange[0].toDate(), dateRange[1].toDate());  
    const list = [...new Array(rangeGap+1)].map(()=>{
        date.setDate(date.getDate() + 1);
        return new Date(date.getTime());
    });
    return list;
};
const CalendarEditor = ({room , dateRange , reloadRoom}) => {
    const list = initializeDateList(dateRange);
    const [chambre,setChambre] = useState(room);
    const [selectedRoom, setSelectedRoom] = useState(new Array(0));
    const [anchorElRoom, setAnchorElRoom] = React.useState(null);
    const [openRoomEditor, setOpenRoomEditor] = React.useState(false);

    const [selectedRatePlan, setSelectedRatePlan] = useState(new Array(0));
    const [anchorElRatePlan, setAnchorElRatePlan] = React.useState(null);
    const [openRatePlanEditor, setOpenRatePlanEditor] = React.useState(false);

    const [openRowEditor, setOpenRowEditor] = useState(false);
    const [rowEditorItem , setRowEditorItem] = useState({
        name:'',
        tarif_index:'',
        adultsNum:'',
        childrenNum:'',
    });

    const [roomDetails, setRoomDetails] = useState({
        roomStatus: [],
        roomToSell: [],
        bookedRoom: [],
    });
    const [ratePlanList, setRatePlanList] = useState(new Array(0));
    const [ratePlanAttributList, setRatePlanAttributeList] = useState(new Array(0));
    
    useEffect(() => {
        loadRoomDetailsRows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRoom]);

    useEffect(() => {
        loadRatePlanRows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRatePlan]);
    

    useEffect(() => {
        loadCells();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chambre]);

    const cleanOthers = (name) => {
        const setters = {
            room: setSelectedRoom,
            rate_plan: setSelectedRatePlan,
        };
        setters[name]?.call(setters, []);
    };

    const handleSelectOneRoom = (e, item) => {
        if (!selectedRoom.includes(item) || selectedRoom.length > 1) {
            const target = e.currentTarget;
            setSelectedRoom([item]);
            setSelectedRatePlan([]);
            setOpenRoomEditor(false);
            setTimeout(
                () => {
                    setAnchorElRoom(target);
                    setOpenRoomEditor(true);
                }, 420
            );
        }
    };
    const handleSelectOneRatePlan = (e, item) => {
        if (!selectedRatePlan.includes(item) || selectedRatePlan.length > 1) {
            const target = e.currentTarget;
            setSelectedRatePlan([item]);
            setSelectedRoom([]);
            setOpenRatePlanEditor(false);
            setTimeout(
                () => {
                    setAnchorElRatePlan(target);
                    setOpenRatePlanEditor(true);
                }, 420
            );
        }
    };

    const loadRoomDetailsRows = () => {
        const roomStatus = []; const roomToSell = []; const bookedRoom= [];
        chambre.statusDays.forEach((status,i)=>{
            roomStatus.push((
                <td className='status' key={`roomStatus-${i}`}>
                    <StatusCell 
                        available={!status.closed} 
                        date={status.date}
                        chambre={chambre}
                        setChambre={setChambre}
                        index={i}
                    />
                </td>
            ))
            roomToSell.push((
                <td key={`roomToSell-${i}`} style={{position:'relative'}}>
                    <SelectableRoomCell
                        item={status.date}
                        selected={selectedRoom}
                        setSelected={setSelectedRoom}
                        setAnchorEl={setAnchorElRoom}
                        setOpen={setOpenRoomEditor}
                        cleanOthers={cleanOthers}
                        chambre={chambre}
                        onClick={(e) => handleSelectOneRoom(e, status.date)}
                    >
                        {status.toSell}                        
                    </SelectableRoomCell>
                    
                </td>
            ))
            bookedRoom.push((
                <td key={`bookedRoom-${i}`}>
                    {chambre.booked?.[i]?.value}
                </td>
            ))
        })
        setRoomDetails({
            roomStatus,roomToSell,bookedRoom
        });
    };
    const loadRatePlanRows  = () => {
        const ratePlanListTemp = []; // [RatePlan values and information ] all the cells in the right side in the calendar(table)
        const ratePlanAttributeListTemp = []; // [RatePlan name or attribute ] all the cells in the left side in the calendar(table)
        chambre.planTarifaire.forEach((tarif, j) => {
            const prixTarifList = [];
            const prixTarifAttributeList = [];
            [...new Array(tarif.prixTarif[0]?.versions?.length)].forEach((versionsPrototype,index)=>{

                prixTarifAttributeList.push((
                    <tr key={index}>
                        <td style={{ paddingLeft:'50% !important',letterSpacing:'0.2em'}}>
                            
                            <Grid direction='row' spacing={1} justifyContent='space-around' container alignItems='center'>
                                <Grid item xs={8}>
                                    <Stack sx={{ p: 1 }} direction='row' spacing={0} alignItems='flex-end' justifyContent='flex-start'>
                                        {
                                            [...new Array(tarif.prixTarif[0]?.versions[index]?.adultsNum)].map((e, i) => (
                                                    <PersonIcon key={i} />
                                                )
                                            )
                                        }
                                        {
                                            [...new Array(tarif.prixTarif[0]?.versions[index]?.childrenNum)].map((e, i) => (
                                                    <PersonIcon key={i} sx={{ fontSize: 15 }} />
                                                )
                                            )
                                        }
                                    </Stack>
                                </Grid>
                                <Grid item xs={2}>
                                    <Stack justifyContent='flex-end'>
                                        <CustomizedIconButton 
                                            sx={{ width: 22, height: 22 }}
                                            onClick={() => {
                                                setOpenRowEditor(true);
                                                setRowEditorItem((prev) => (
                                                    {
                                                        ...prev,
                                                        name: 'version',
                                                        tarif_index:j,
                                                        adultsNum: tarif.prixTarif[0]?.versions[index]?.adultsNum,
                                                        childrenNum: tarif.prixTarif[0]?.versions[index]?.childrenNum,
                                                    }
                                                ));
                                            }}
                                        >
                                            <EditIcon sx={{ width: 10, height: 10 }} />
                                        </CustomizedIconButton>
                                    </Stack>          
                                </Grid>
                                
                                
                            </Grid>
                            
                                
                        </td>
                    </tr>
                ));
                prixTarifList.push((
                    <tr key={index}>
                        {
                            tarif.prixTarif.map((pt, i) => {
                                const item = `${pt.date}@${j}@${index}`;
                                return (
                                    <td
                                        key={`${index}-${i}`}
                                        style={{position:'relative'}}
                                    >
                                        <SelectableRatePlanCell 
                                            item={item}
                                            chambre={chambre} 
                                            selected={selectedRatePlan} 
                                            setSelected={setSelectedRatePlan} 
                                            setAnchorEl={ setAnchorElRatePlan}
                                            setOpen={setOpenRatePlanEditor}
                                            cleanOthers={cleanOthers}
                                            onClick={(e) => handleSelectOneRatePlan(e, item)}
                                        >
                                            {pt.versions[index]?.prix}$
                                        </SelectableRatePlanCell>
                                        
                                    </td>
                                )
                                        
                            })
                        }
                    </tr>
                ));
            });
            ratePlanListTemp.push((
                    <React.Fragment key={j}>
                        <tr key='ratePlan status'>
                            {
                                tarif.prixTarif.map((p, i) => (
                                        <td className='status' key={i}>
                                            <StatusCell 
                                                available={!p.closed} 
                                                date={p.date}
                                                chambre={chambre}
                                                setChambre={setChambre}
                                                index={j}
                                                subIndex={i}
                                                isRatePlan
                                            />
                                        </td>
                                    ))
                            }
                        </tr>
                        {
                            prixTarifList.map((prixElement)=>prixElement)
                        }
                    </React.Fragment>
                ))
            ratePlanAttributeListTemp.push((
                <React.Fragment key={j}>
                    <tr key='ratePlan attribute status'>
                        <td className='status'>                    
                            <Grid direction='row' spacing={1} justifyContent='space-around' container alignItems='center'>
                                <Grid item xs={8} sx={{overflowX:'auto',overflowY:'hidden',maxWidth:'100',maxHeight:'25px'}}>
                                    <Stack justifyContent='flex-start' >
                                        <p >
                                            {tarif.nom}
                                        </p>
                                    </Stack>
                                </Grid>
                                <Grid item xs={2} >
                                    <Stack justifyContent='flex-end'>
                                        <CustomizedIconButton 
                                            sx={{ width: 22, height: 22 }}
                                            onClick={() => {
                                                setOpenRowEditor(true);
                                                setRowEditorItem((prev)=>(
                                                    {
                                                        ...prev,
                                                        name:'availability',
                                                        tarif_index: j,
                                                    }
                                                ));
                                            }}
                                        > 
                                            <EditIcon sx={{ width: 10, height: 10}} />
                                        </CustomizedIconButton>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </td>
                    </tr>
                    {
                        prixTarifAttributeList.map((element)=>element)
                    }
                </React.Fragment>
            ));
        })
        setRatePlanList(()=>ratePlanListTemp);
        setRatePlanAttributeList(()=>ratePlanAttributeListTemp);
    };

    const loadCells = () => {
       loadRoomDetailsRows();
       loadRatePlanRows();
    };
    
    return (
        <CustomizedPaperOutside elevation={12} sx={{ background: '#E3EDF7', p: 5 }}>
            <CellRoomEditorPopper open={openRoomEditor} setOpen={setOpenRoomEditor} anchorEl={anchorElRoom} sx={{ zIndex:16777270}} selected={selectedRoom} setSelected={setSelectedRoom} chambre={chambre} setChambre={setChambre}/>
            <CellRatePlanEditorPopper open={openRatePlanEditor} setOpen={setOpenRatePlanEditor} anchorEl={anchorElRatePlan} sx={{ zIndex: 16777270 }} selected={selectedRatePlan} setSelected={setSelectedRatePlan} chambre={chambre}  setChambre={setChambre}/>
            <RowEditorPopper open={openRowEditor} setOpen={setOpenRowEditor}  chambre={chambre} item={rowEditorItem} reloadRoom={reloadRoom}/>
            <Grid container>
                <Grid item xs={4} >
                    <CalendarAttributeSide 
                        chambre={chambre} 
                        ratePlanAttributeList={ratePlanAttributList}
                        reloadRoom={reloadRoom}
                    />
                </Grid>
                <Grid item xs={8}>
                    <CalendarValueSide  
                        list={list} 
                        chambre={chambre} 
                        ratePlanList={ratePlanList} 
                        roomDetails={roomDetails}
                    />
                </Grid>
            </Grid>
        </CustomizedPaperOutside>
    );
};
CalendarEditor.propTypes = {
    room: PropTypes.any,
    dateRange: PropTypes.any,
    reloadRoom: PropTypes.any,

};
export default CalendarEditor;