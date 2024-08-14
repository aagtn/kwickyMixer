import '../styles/AutoMix.css'
import * as Popover from '@radix-ui/react-popover';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';

export default function AutoMixParams(){
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
                Auto Mix
              </p>
             
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="width">
                  Start at
                </label>
                <input className="Input-prop" id="width" defaultValue="-10" type='number' min={-30} max={0}/>
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="width">
                  Duration
                </label>
                <input className="Input-prop" id="width" defaultValue="5" type='number' min={0} max={30}/>
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