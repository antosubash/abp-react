import {
    memo,
    SyntheticEvent,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import { useDebounce } from './hooks/useDebounce';
import { Input } from './Input';

type SearchProps = {
    onUpdate: (searchStr: string) => void;
    value: string;
};
const SearchInput = ({ onUpdate, value }: SearchProps) => {
    const [searchTerm, setSearchTerm] = useState<string>(value);
    const ref = useRef<HTMLInputElement>(null);
    const searchStr = useDebounce<string>(searchTerm);

    const onSearchEvent = useCallback((e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const { value } = target;
        if (value.trim().length === 0) {
            onUpdate('');
        }
        setSearchTerm(value);
    }, []);

    useEffect(() => {
        if (searchStr) onUpdate(searchStr);
    }, [searchStr]);

    useEffect(() => {
        if (value) {
            ref.current?.focus();
        }
    }, [value]);

    return (
        <section className="search mb-10">
            <Input
                ref={ref}
                type="text"
                value={searchTerm}
                placeholder="Search..."
                onChange={onSearchEvent}
            />
        </section>
    );
};

export const Search = memo(SearchInput);
