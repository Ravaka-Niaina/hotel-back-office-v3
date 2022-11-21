import { createContext, useContext } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useHistory , useNavigate } from 'react-router-dom';


const IdleTimerContext = createContext({});

export default function IdleTimer ({ children }) {
  const navigate = useNavigate();

  // deconnexion
  function logout(e){
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    localStorage.removeItem('partner_id');
    localStorage.removeItem('id_token');
    localStorage.removeItem('hotel_id');
    localStorage.removeItem('user_attr');
    localStorage.removeItem('user_details');
    navigate('/login', {replace:true});
  }

  const onPrompt = () => {
    // Fire a Modal Prompt
  }

  const onIdle = () => {
    // Close Modal Prompt
    // Do some idle action like log out your user
    logout();
  }

  const onActive = (event) => {
    // Close Modal Prompt
    // Do some active action
  }

  const onAction = (event) => {
    // Do something when a user triggers a watched event
  }

  const {
    start,
    reset,
    activate,
    pause,
    resume,
    isIdle,
    isPrompted,
    isLeader,
    getTabId,
    getRemainingTime,
    getElapsedTime,
    getLastIdleTime,
    getLastActiveTime,
    getTotalIdleTime,
    getTotalActiveTime
  } = useIdleTimer({
    onPrompt,
    onIdle,
    onActive,
    onAction,
    timeout: 1000 * 60 * (process.env.REACT_APP_ENV === 'dev' ? 9999 : 15),// milliseconds * seconds * minutes,
    events: [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove',
      'visibilitychange'
    ],
    immediateEvents: [],
    debounce: 0,
    throttle: 0,
    eventsThrottle: 200,
    element: document,
    startOnMount: true,
    startManually: false,
    stopOnIdle: false,
    crossTab: false,
    name: 'idle-timer',
    syncTimers: 0,
    leaderElection: false
  });

  return(
    <IdleTimerContext.Provider value={ { logout } }>
      <>{ children }</>
    </IdleTimerContext.Provider>
  );
}

export const useIdleTimerContext = () => useContext(IdleTimerContext);