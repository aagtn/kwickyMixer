import '../styles/AutoMix.css'
import * as Popover from '@radix-ui/react-popover';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useAutoMixMutation } from '../hooks/mutations';

interface CrossFader {
  position:number;
  autoMixStartAt:number;
  autoMixDuration:number;
}

interface CrossFaderProps{
  data:CrossFader;
}

export default function AutoMixParams({data}:CrossFaderProps){
  const {updateAutoMixStart,updateAutoMixDuration} = useAutoMixMutation()

  const handleUpdateStartAt = (event:React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    updateAutoMixStart.mutate({newValue});
  } 

  const handleUpdateDuration = (event:React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    updateAutoMixDuration.mutate({newValue});
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
             
              {/* <fieldset className="Fieldset">
                <label className="Label" htmlFor="width">
                  Start at
                </label>
                <input className="Input-prop" id="width" onChange={handleUpdateStartAt} defaultValue={data.autoMixStartAt} type='number' min={-30} max={0}/>
              </fieldset> */}
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="width">
                  Duration
                </label>
                <input className="Input-prop" id="width" onChange={handleUpdateDuration} defaultValue={data.autoMixDuration} type='number' min={0} max={30}/>
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