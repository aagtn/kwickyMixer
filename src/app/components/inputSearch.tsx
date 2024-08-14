import '../styles/searchInput.css'
import { Button } from "@radix-ui/themes";
import * as Form from '@radix-ui/react-form';
import { useState } from "react";
import { useSearhInputMutations } from '../hooks/mutations';

interface InputSearchProps {
    data: string;
    deckId: string;
}

export default function InputSearch({ data, deckId }: InputSearchProps) {

    const { updateDeckSearchInput } = useSearhInputMutations()
    const [inputValue, setInputValue] = useState<string>(data);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateDeckSearchInput.mutate({ newSearchInput: inputValue, deck: deckId });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <Form.Root onSubmit={handleSubmit} className="flex w-full items-center mb-2">
            <Form.Field className="w-[80%] flex items-center" name="search">
                <Form.Control asChild>
                    <input
                        className="Input w-full p-2 border border-gray-300 rounded-md mr-4"
                        type="text"
                        required
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Enter a track or an artist name..."
                    />
                </Form.Control>
                <Form.Submit asChild>
                    <div className="btn-morph">
                        <Button variant="surface" className="ml-4 p-2 cursor-pointer">
                            Search
                        </Button>
                    </div>
                </Form.Submit>
            </Form.Field>

        </Form.Root>
    );
}
