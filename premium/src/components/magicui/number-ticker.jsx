// Adapted from Magic UI Number Ticker (MIT): Russian formatting and reduced motion.
import {useEffect,useRef} from 'react';
import {useMotionValue,useSpring,useReducedMotion} from 'motion/react';
export function NumberTicker({value,className=''}) {
 const ref=useRef(null); const reduced=useReducedMotion();
 const motionValue=useMotionValue(value); const spring=useSpring(motionValue,{damping:60,stiffness:160});
 useEffect(()=>{motionValue.set(value)},[value,motionValue]);
 useEffect(()=>spring.on('change',v=>{if(ref.current)ref.current.textContent=Math.round(v).toLocaleString('ru-RU')}),[spring]);
 return <span className={className} aria-label={value.toLocaleString('ru-RU')}><span aria-hidden="true" ref={reduced?undefined:ref}>{value.toLocaleString('ru-RU')}</span></span>;
}
