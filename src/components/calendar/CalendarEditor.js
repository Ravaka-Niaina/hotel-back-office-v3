import React , { useEffect , useState , useContext } from 'react';
import debounce from 'lodash.debounce';
import { Grid , Stack } from '@mui/material';


import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';

import StatusCell from './cells/StatusCell';

import { CellRoomEditorPopper, SelectableRoomCell } from './cells/room';
import { CellRatePlanEditorPopper , SelectableRatePlanCell } from './cells/rateplan';

import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import CalendarValueSide from './CalendarValueSide';
import CalendarAttributeSide from './CalendarAttributeSide';

import { ThemeContext } from '../context/Wrapper';

import './index.css';

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
    const list = [...new Array(rangeGap+1)].map((e,i)=>{
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

    const [roomDetails, setRoomDetails] = useState({
        roomStatus: [],
        roomToSell: [],
        bookedRoom: [],
    });
    const [ratePlanList, setRatePlanList] = useState(new Array(0));
    const [ratePlanAttributList, setRatePlanAttributeList] = useState(new Array(0));
    
    useEffect(() => {
        loadRoomDetailsRows();
    }, [selectedRoom]);

    useEffect(() => {
        loadRatePlanRows();
    }, [selectedRatePlan]);

    useEffect(() => {
        loadCells();
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
                                    <Stack sx={{ p: 1 }} direction='row' spacing={0} alignItems='center' justifyContent='flex-start'>
                                        {
                                            [...new Array(tarif.prixTarif[0]?.versions[index]?.nbPers)].map((e, i) => {
                                                return (
                                                    <PersonIcon key={i} />
                                                )
                                            })
                                        }
                                    </Stack>
                                </Grid>
                                <Grid item xs={2}>
                                    <Stack justifyContent='flex-end'>
                                        <CustomizedIconButton sx={{ width: 25, height: 25 }}>
                                            <EditIcon sx={{ width: 12, height: 12 }} />
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
                        <td className='status' style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <span style={{letterSpacing:'5px'}}>
                                • 
                            </span>
                             {tarif.nom}
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

export default CalendarEditor;