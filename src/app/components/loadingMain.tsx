import {Theme} from "@radix-ui/themes"

export default function LoadingMain() {
    return (
        <Theme accentColor="indigo" appearance="dark">
            <div className='w-full h-[100vh] flex items-center justify-center flex-col'>
                <div className="mt-3">Loading...</div>
            </div>
        </Theme>
    )
}
