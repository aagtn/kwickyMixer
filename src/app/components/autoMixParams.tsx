import '../styles/AutoMix.css'
import * as Popover from '@radix-ui/react-popover';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';
import { updateAutoMixDuration } from '../store/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MixTable } from '../types';


export default function AutoMixParams(){
  
  const dispatch = useDispatch()
  const autoMixDuration = useSelector((state:MixTable)=> state.player.mixer.autoMixDuration)
 
  const handleUpdateDuration = (event:React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);  
    dispatch(updateAutoMixDuration(newValue))
  } 

    return(
        <Popover.Root>
        <Popover.Trigger asChild>
          <button className="IconButton" aria-label="Update dimensions">
            <MixerHorizontalIcon />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="PopoverContent" sideOffset={5}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p className="Text" style={{ marginBottom: 10 }}>
                Auto fade
              </p>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="width">
                  Duration
                </label>
                <input className="Input-prop" id="width" onChange={handleUpdateDuration} defaultValue={autoMixDuration} type='number' min={0} max={30}/>
              </fieldset>
            </div>
            <Popover.Close className="PopoverClose" aria-label="Close">
              <Cross2Icon />
            </Popover.Close>
            <Popover.Arrow className="PopoverArrow" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    )
}